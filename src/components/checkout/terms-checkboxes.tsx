'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsState {
  orderConfirm: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
}

interface TermsCheckboxesProps {
  state: TermsState;
  onChange: (state: TermsState) => void;
}

export function TermsCheckboxes({ state, onChange }: TermsCheckboxesProps) {
  function toggle(key: keyof TermsState) {
    onChange({ ...state, [key]: !state[key] });
  }

  const allChecked = state.orderConfirm && state.termsOfService && state.privacyPolicy;

  function toggleAll() {
    const next = !allChecked;
    onChange({ orderConfirm: next, termsOfService: next, privacyPolicy: next });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">약관 동의</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b pb-3">
          <Checkbox id="all" checked={allChecked} onCheckedChange={toggleAll} />
          <Label htmlFor="all" className="cursor-pointer font-medium">
            전체 동의
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="orderConfirm"
            checked={state.orderConfirm}
            onCheckedChange={() => toggle('orderConfirm')}
          />
          <Label htmlFor="orderConfirm" className="cursor-pointer text-sm font-normal">
            주문 내용을 확인했습니다 (필수)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="termsOfService"
            checked={state.termsOfService}
            onCheckedChange={() => toggle('termsOfService')}
          />
          <Label htmlFor="termsOfService" className="cursor-pointer text-sm font-normal">
            이용약관에 동의합니다 (필수)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="privacyPolicy"
            checked={state.privacyPolicy}
            onCheckedChange={() => toggle('privacyPolicy')}
          />
          <Label htmlFor="privacyPolicy" className="cursor-pointer text-sm font-normal">
            개인정보 처리방침에 동의합니다 (필수)
          </Label>
        </div>
      </div>
    </div>
  );
}
