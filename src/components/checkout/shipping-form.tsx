'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ShippingData {
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  deliveryNotes: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
  function update(field: keyof ShippingData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">배송 정보</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recipientName">받는 분 *</Label>
          <Input
            id="recipientName"
            value={data.recipientName}
            onChange={(e) => update('recipientName', e.target.value)}
            placeholder="이름"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">연락처 *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="010-0000-0000"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="postalCode">우편번호 *</Label>
        <div className="flex gap-2">
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            placeholder="우편번호"
            className="w-40"
          />
          <Button type="button" variant="outline" size="sm">
            주소 찾기
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">주소 *</Label>
        <Input
          id="address"
          value={data.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="기본 주소"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="addressDetail">상세 주소</Label>
        <Input
          id="addressDetail"
          value={data.addressDetail}
          onChange={(e) => update('addressDetail', e.target.value)}
          placeholder="상세 주소 입력"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deliveryNotes">배송 메모</Label>
        <Textarea
          id="deliveryNotes"
          value={data.deliveryNotes}
          onChange={(e) => update('deliveryNotes', e.target.value)}
          placeholder="배송 시 요청사항을 입력하세요"
          rows={3}
        />
      </div>
    </div>
  );
}
