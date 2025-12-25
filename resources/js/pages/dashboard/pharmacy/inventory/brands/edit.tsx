import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Inventory', href: '/pharmacy/inventory' },
    { title: 'Brands', href: '/pharmacy/inventory/brands' },
    { title: 'Edit' },
];

interface Brand {
    id: number;
    name: string;
    country?: string;
    manufacturer?: string;
    description?: string;
    image?: string;
    status: string;
}

interface Props {
    brand: Brand;
}

export default function EditBrandPage({ brand }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
        country: brand.country || '',
        manufacturer: brand.manufacturer || '',
        description: brand.description || '',
        image: null as File | null,
        status: brand.status,
    });

    useEffect(() => {
        if (brand.image) {
            setImagePreview(`/storage/${brand.image}`);
        }
    }, [brand.image]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pharmacy/inventory/brands/${brand.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Brand" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Brand</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update brand information
                        </p>
                    </div>
                    <Link href="/pharmacy/inventory/brands">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Brands
                        </Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Brand Name *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g., Pfizer"
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    placeholder="e.g., USA"
                                />
                                {errors.country && (
                                    <p className="text-sm text-red-600">{errors.country}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="manufacturer">Manufacturer</Label>
                                <Input
                                    id="manufacturer"
                                    value={data.manufacturer}
                                    onChange={(e) => setData('manufacturer', e.target.value)}
                                    placeholder="e.g., Manufacturer name"
                                />
                                {errors.manufacturer && (
                                    <p className="text-sm text-red-600">{errors.manufacturer}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief description of the brand"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <div className="space-y-4">
                                {imagePreview ? (
                                    <div className="relative inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-48 w-48 rounded-lg object-cover border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="image"
                                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                                            </div>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                )}
                                {!imagePreview && (
                                    <Input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            {errors.image && (
                                <p className="text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {processing ? 'Updating...' : 'Update Brand'}
                            </Button>
                            <Link href="/pharmacy/inventory/brands">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </PharmacyLayout>
    );
}
