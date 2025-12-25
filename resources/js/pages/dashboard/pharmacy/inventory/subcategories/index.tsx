import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Package,
    Plus,
    Edit,
    Trash2,
    Search,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Inventory', href: '/pharmacy/inventory' },
    { title: 'Subcategories' },
];

interface Category {
    id: number;
    name: string;
}

interface Subcategory {
    id: number;
    name: string;
    description?: string;
    status: string;
    category_id: number;
    category?: Category;
    created_at: string;
}

interface Props {
    subcategories?: Subcategory[];
    categories?: Category[];
}

export default function SubcategoriesPage({ subcategories = [] }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            router.delete(`/pharmacy/inventory/subcategories/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const filteredSubcategories = subcategories.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.category && sub.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (sub.description && sub.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Medicine Subcategories" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Medicine Subcategories</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage medicine subcategories for your inventory
                        </p>
                    </div>
                    <Link href="/pharmacy/inventory/subcategories/create">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Subcategory
                        </Button>
                    </Link>
                </div>

                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search subcategories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                {/* Subcategories Table */}
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubcategories.map((subcategory) => (
                                    <tr key={subcategory.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 mr-3">
                                                    <Package className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {subcategory.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-purple-600">
                                                {subcategory.category?.name || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 max-w-md truncate">
                                                {subcategory.description || '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                subcategory.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {subcategory.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(subcategory.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/pharmacy/inventory/subcategories/${subcategory.id}/edit`}>
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
                                                    onClick={() => handleDelete(subcategory.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredSubcategories.length === 0 && (
                        <div className="p-12 text-center">
                            <Package className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-4 text-sm text-gray-600">
                                No subcategories found matching your search.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </PharmacyLayout>
    );
}

