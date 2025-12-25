import MedicalLabLayout from '@/layouts/medical-lab-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Services', href: '/medical-lab/services' },
    { title: 'Edit' },
];

interface Service {
    id: number;
    name: string;
    category: string;
    description?: string;
    price: number;
    duration?: string;
    status: string;
}

interface Props {
    service: Service;
    categories?: string[];
}

export default function EditServicePage({ service, categories = [] }: Props) {
    // Default categories if none provided
    const defaultCategories = ['Hematology', 'Chemistry', 'Urine Analysis', 'Radiology', 'Microbiology', 'Immunology', 'Cardiology', 'Pathology', 'Genetics', 'Toxicology', 'Diagnostic'];
    const availableCategories = categories.length > 0 ? categories : defaultCategories;

    const { data, setData, put, processing, errors } = useForm({
        name: service.name,
        category: service.category,
        description: service.description || '',
        price: service.price.toString(),
        duration: service.duration || '',
        status: service.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/medical-lab/services/${service.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Service" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Service</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Update service information
                        </p>
                    </div>
                    <Link href="/medical-lab/services">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Button>
                    </Link>
                </div>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Service Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., Complete Blood Count"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="">Select category</option>
                                    {availableCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Brief description of the service"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (₦) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                    required
                                />
                                {errors.price && (
                                    <p className="text-sm text-red-600">{errors.price}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    value={data.duration}
                                    onChange={(e) => setData('duration', e.target.value)}
                                    placeholder="e.g., 24 hours"
                                />
                                {errors.duration && (
                                    <p className="text-sm text-red-600">{errors.duration}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status *</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link href="/medical-lab/services">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-teal-600 hover:bg-teal-700">
                                {processing ? 'Updating...' : 'Update Service'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </MedicalLabLayout>
    );
}

