import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ConfirmationDialog from '@/components/confirmation-dialog';
import {
    Pill,
    Plus,
    Edit,
    Trash2,
    Search,
    AlertCircle,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Inventory', href: '/pharmacy/inventory' },
    { title: 'Medicines' },
];

interface Category {
    id: number;
    name: string;
}

interface Subcategory {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Medicine {
    id: number;
    name: string;
    generic_name?: string;
    dosage_form: string;
    strength?: string;
    description?: string;
    category_id: number;
    subcategory_id?: number;
    brand_id?: number;
    category?: Category;
    subcategory?: Subcategory;
    brand?: Brand;
    is_restricted: boolean;
    min_age?: number;
    requires_id_verification: boolean;
    status: string;
    created_at: string;
}

interface Props {
    medicines?: Medicine[];
    categories?: Category[];
    subcategories?: Subcategory[];
    brands?: Brand[];
}

export default function MedicinesPage({ medicines = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [medicineToDelete, setMedicineToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setMedicineToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (medicineToDelete) {
            router.delete(`/pharmacy/inventory/medicines/${medicineToDelete}`, {
                preserveScroll: true,
            });
            setMedicineToDelete(null);
        }
    };

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (med.category && med.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (med.brand && med.brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Medicines Inventory" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Medicines Inventory</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your medicine inventory
                        </p>
                    </div>
                    <Link href="/pharmacy/inventory/medicines/create">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Medicine
                        </Button>
                    </Link>
                </div>

                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                {/* Medicines Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Generic Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Brand
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Dosage Form
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Strength
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMedicines.map((medicine) => {
                                    const isRestricted = medicine.is_restricted;
                                    return (
                                        <tr 
                                            key={medicine.id} 
                                            className={`hover:bg-gray-50 ${isRestricted ? 'bg-orange-50/50' : ''}`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg mr-3 ${isRestricted ? 'bg-orange-100' : 'bg-purple-100'}`}>
                                                        <Pill className={`h-5 w-5 ${isRestricted ? 'text-orange-600' : 'text-purple-600'}`} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {medicine.name}
                                                        </div>
                                                        {isRestricted && (
                                                            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                                <AlertCircle className="h-3 w-3" />
                                                                <span>Restricted</span>
                                                            </div>
                                                        )}
                                                        {medicine.requires_id_verification && (
                                                            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                                                                <AlertCircle className="h-3 w-3" />
                                                                <span>ID Required</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {medicine.generic_name || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {medicine.category?.name || 'N/A'}
                                                </div>
                                                {medicine.subcategory && (
                                                    <div className="text-xs text-gray-500">
                                                        {medicine.subcategory.name}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {medicine.brand?.name || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {medicine.dosage_form}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {medicine.strength || '—'}
                                                </div>
                                                {medicine.min_age && (
                                                    <div className="text-xs text-gray-500">
                                                        Min age: {medicine.min_age} years
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    medicine.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : medicine.status === 'discontinued'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {medicine.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/pharmacy/inventory/medicines/${medicine.id}/edit`}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(medicine.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filteredMedicines.length === 0 && (
                        <div className="p-12 text-center">
                            <Pill className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-sm text-gray-600">
                                No medicines found matching your search.
                            </p>
                        </div>
                    )}
                </Card>

                <ConfirmationDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    title="Delete Medicine"
                    description="Are you sure you want to delete this medicine? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    onConfirm={handleDeleteConfirm}
                    variant="destructive"
                />
            </div>
        </PharmacyLayout>
    );
}

