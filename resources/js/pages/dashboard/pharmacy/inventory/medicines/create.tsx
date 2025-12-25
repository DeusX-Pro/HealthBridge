import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Inventory', href: '/pharmacy/inventory' },
    { title: 'Medicines', href: '/pharmacy/inventory/medicines' },
    { title: 'Create' },
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

interface Props {
    categories: Category[];
    subcategories: Subcategory[];
    brands: Brand[];
}

export default function CreateMedicinePage({ categories = [], subcategories = [], brands = [] }: Props) {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        subcategory_id: '',
        brand_id: '',
        generic_name: '',
        dosage_form: '',
        strength: '',
        description: '',
        images: [] as File[],
        is_restricted: false,
        min_age: '',
        requires_id_verification: false,
        status: 'active',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const newFiles = [...data.images, ...files] as File[];
            setData('images', newFiles as any);
            
            const newPreviews: string[] = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result as string);
                    if (newPreviews.length === files.length) {
                        setImagePreviews([...imagePreviews, ...newPreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...data.images];
        const newPreviews = [...imagePreviews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setData('images', newImages as any);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pharmacy/inventory/medicines', {
            preserveScroll: true,
        });
    };

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Medicine" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create Medicine</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Add a new medicine to your inventory
                        </p>
                    </div>
                    <Link href="/pharmacy/inventory/medicines">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Medicines
                        </Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Medicine Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Paracetamol 500mg"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="generic_name">Generic Name</Label>
                                <Input
                                    id="generic_name"
                                    value={data.generic_name}
                                    onChange={(e) => setData('generic_name', e.target.value)}
                                    placeholder="e.g., Acetaminophen"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category *</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-sm text-red-600">{errors.category_id}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subcategory_id">Subcategory</Label>
                                <select
                                    id="subcategory_id"
                                    value={data.subcategory_id}
                                    onChange={(e) => setData('subcategory_id', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                >
                                    <option value="">Select subcategory (optional)</option>
                                    {subcategories.map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand_id">Brand</Label>
                                <select
                                    id="brand_id"
                                    value={data.brand_id}
                                    onChange={(e) => setData('brand_id', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                >
                                    <option value="">Select brand (optional)</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dosage_form">Dosage Form *</Label>
                                <Input
                                    id="dosage_form"
                                    value={data.dosage_form}
                                    onChange={(e) => setData('dosage_form', e.target.value)}
                                    placeholder="e.g., Tablet, Capsule, Syrup"
                                    required
                                />
                                {errors.dosage_form && (
                                    <p className="text-sm text-red-600">{errors.dosage_form}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="strength">Strength</Label>
                                <Input
                                    id="strength"
                                    value={data.strength}
                                    onChange={(e) => setData('strength', e.target.value)}
                                    placeholder="e.g., 500mg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as 'active' | 'inactive' | 'discontinued')}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="discontinued">Discontinued</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief description of the medicine"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="images">Images (Multiple)</Label>
                            <div className="space-y-4">
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-32 w-full rounded-lg object-cover border border-gray-300"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="images"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB each</p>
                                        </div>
                                        <input
                                            id="images"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                            {errors.images && (
                                <p className="text-sm text-red-600">{errors.images}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="is_restricted" className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_restricted"
                                        checked={data.is_restricted}
                                        onChange={(e) => setData('is_restricted', e.target.checked)}
                                        className="rounded"
                                    />
                                    Restricted Medicine
                                </Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="min_age">Minimum Age</Label>
                                <Input
                                    id="min_age"
                                    type="number"
                                    value={data.min_age}
                                    onChange={(e) => setData('min_age', e.target.value)}
                                    placeholder="e.g., 18"
                                    min="0"
                                    max="120"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requires_id_verification" className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="requires_id_verification"
                                        checked={data.requires_id_verification}
                                        onChange={(e) => setData('requires_id_verification', e.target.checked)}
                                        className="rounded"
                                    />
                                    Requires ID Verification
                                </Label>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {processing ? 'Creating...' : 'Create Medicine'}
                            </Button>
                            <Link href="/pharmacy/inventory/medicines">
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
