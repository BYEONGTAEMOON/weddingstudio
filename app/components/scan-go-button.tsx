'use client';

import type { ButtonHTMLAttributes } from 'react';

import { useScanModal } from './scan-modal-context';

type ScanGoButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> & {
    studio?: string;
};

export function ScanGoButton({ studio, className, ...rest }: ScanGoButtonProps) {
    const { open } = useScanModal();

    return (
        <button
            type="button"
            onClick={() => open(studio)}
            className={`cursor-pointer ${className ?? ''}`}
            {...rest}
        />
    );
}
