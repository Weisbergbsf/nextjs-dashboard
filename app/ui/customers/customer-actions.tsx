'use client';

import Modal from '@/app/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CustomerActions({
    id,
    name,
    deleteAction,
}: {
    id: string;
    name: string;
    deleteAction: (formData: FormData) => Promise<void>;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            // Create a FormData object to mimic form submission
            const formData = new FormData();
            formData.append('id', id);
            await deleteAction(formData);
            router.refresh(); // Refresh the page to reflect the updated data
        } catch (error) {
            console.error('Failed to delete customer:', error);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('Button clicked, opening modal');
                    setIsModalOpen(true);
                }}
                className="rounded-md border p-2 hover:bg-gray-100"
            >
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5 text-red-600" />
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Customer"
                message={`Are you sure you want to delete ${name}? This action cannot be undone.`}
                confirmButtonText="Delete"
                cancelButtonText="Cancel"
                isLoading={isLoading}
            />
        </>
    );
}