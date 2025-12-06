import PharmacyLayout from '@/layouts/pharmacy-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
    { title: 'Brands' },
];

export default function BrandsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [brands, setBrands] = useState([
        { id: 1, name: 'Pfizer', country: 'USA', description: 'Leading pharmaceutical company', createdAt: '2024-01-15' },
        { id: 2, name: 'GlaxoSmithKline', country: 'UK', description: 'Global healthcare company', createdAt: '2024-01-15' },
        { id: 3, name: 'Novartis', country: 'Switzerland', description: 'Swiss multinational pharmaceutical', createdAt: '2024-01-15' },
        { id: 4, name: 'Roche', country: 'Switzerland', description: 'Healthcare company', createdAt: '2024-01-15' },
        { id: 5, name: 'Merck', country: 'USA', description: 'American pharmaceutical company', createdAt: '2024-01-15' },
    ]);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        country: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBrand) {
            setBrands(brands.map(brand => 
                brand.id === editingBrand.id 
                    ? { ...brand, name: data.name, country: data.country, description: data.description }
                    : brand
            ));
        } else {
            const newBrand = {
                id: brands.length + 1,
                name: data.name,
                country: data.country,
                description: data.description,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setBrands([...brands, newBrand]);
        }
        reset();
        setEditingBrand(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (brand: any) => {
        setEditingBrand(brand);
        setData({
            name: brand.name,
            country: brand.country,
            description: brand.description,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            setBrands(brands.filter(brand => brand.id !== id));
        }
    };

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Medicine Brands" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Medicine Brands</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage medicine brands for your inventory
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Brand
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingBrand ? 'Edit Brand' : 'Add New Brand'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingBrand 
                                        ? 'Update the brand information below.'
                                        : 'Create a new medicine brand for your inventory.'
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Brand Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Pfizer"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            placeholder="e.g., USA"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of the brand"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsDialogOpen(false);
                                            reset();
                                            setEditingBrand(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-purple-600 hover:bg-purple-700">
                                        {editingBrand ? 'Update' : 'Create'} Brand
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBrands.map((brand) => (
                        <Card key={brand.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <Package className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                                        <p className="text-xs text-purple-600">{brand.country}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{brand.description}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(brand)}
                                    className="flex-1"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(brand.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredBrands.length === 0 && (
                    <Card className="p-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No brands found matching your search.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

