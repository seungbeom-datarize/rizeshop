'use client';

import { useEffect, useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import client from '@/lib/client';
import { useToast } from '@/hooks/use-toast';

type Address = {
  id: number;
  userId: number;
  label: string | null;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string | null;
  isDefault: boolean;
  createdAt: string;
};

type AddressFormData = {
  label: string;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  isDefault: boolean;
};

const emptyForm: AddressFormData = {
  label: '',
  recipientName: '',
  phone: '',
  postalCode: '',
  address: '',
  addressDetail: '',
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(
    null,
  );
  const [formData, setFormData] = useState<AddressFormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    try {
      const res = await client.api.addresses.$get();
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenDialog(address?: Address) {
    if (address) {
      setEditingAddress(address);
      setFormData({
        label: address.label || '',
        recipientName: address.recipientName,
        phone: address.phone,
        postalCode: address.postalCode,
        address: address.address,
        addressDetail: address.addressDetail || '',
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      setFormData(emptyForm);
    }
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setEditingAddress(null);
    setFormData(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingAddress) {
        // Update
        const res = await (client.api.addresses[':id'] as any).$put({
          param: { id: editingAddress.id.toString() },
          json: formData,
        });

        if (res.ok) {
          toast({
            title: '배송지가 수정되었습니다.',
          });
          await fetchAddresses();
          handleCloseDialog();
        } else {
          const error = await res.json();
          toast({
            title: '배송지 수정에 실패했습니다.',
            description: error.error,
            variant: 'destructive',
          });
        }
      } else {
        // Create
        const res = await client.api.addresses.$post({
          json: formData,
        });

        if (res.ok) {
          toast({
            title: '배송지가 추가되었습니다.',
          });
          await fetchAddresses();
          handleCloseDialog();
        } else {
          const error = await res.json();
          toast({
            title: '배송지 추가에 실패했습니다.',
            description: error.error,
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      toast({
        title: '오류가 발생했습니다.',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingAddressId) return;

    try {
      const res = await (client.api.addresses[':id'] as any).$delete({
        param: { id: deletingAddressId.toString() },
      });

      if (res.ok) {
        toast({
          title: '배송지가 삭제되었습니다.',
        });
        await fetchAddresses();
      } else {
        const error = await res.json();
        toast({
          title: '배송지 삭제에 실패했습니다.',
          description: error.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '오류가 발생했습니다.',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setDeletingAddressId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">배송지 관리</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 size-4" />
          배송지 추가
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-20">
            <MapPin className="size-12 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium">등록된 배송지가 없습니다.</p>
              <p className="text-sm text-muted-foreground">
                배송지를 추가하고 빠르게 주문하세요!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {address.label && (
                      <span className="font-medium">{address.label}</span>
                    )}
                    {address.isDefault && (
                      <Badge variant="default">기본 배송지</Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(address)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setDeletingAddressId(address.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">{address.recipientName}</span>
                    <span className="ml-2 text-muted-foreground">
                      {address.phone}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    [{address.postalCode}] {address.address}
                    {address.addressDetail && `, ${address.addressDetail}`}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Address Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? '배송지 수정' : '배송지 추가'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">배송지명 (선택)</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="예: 집, 회사"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientName">
                받는 분 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                연락처 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="010-0000-0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">
                우편번호 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                주소 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressDetail">상세 주소 (선택)</Label>
              <Input
                id="addressDetail"
                value={formData.addressDetail}
                onChange={(e) =>
                  setFormData({ ...formData, addressDetail: e.target.value })
                }
                placeholder="동/호수 등"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDefault"
                checked={formData.isDefault}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isDefault: checked === true })
                }
              />
              <Label htmlFor="isDefault" className="cursor-pointer">
                기본 배송지로 설정
              </Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? '저장 중...'
                  : editingAddress
                    ? '수정'
                    : '추가'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>배송지를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 삭제된 배송지는 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
