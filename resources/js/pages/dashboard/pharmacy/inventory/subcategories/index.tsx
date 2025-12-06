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
    { title: 'Subcategories' },
];

export default function SubcategoriesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [subcategories, setSubcategories] = useState([
        { id: 1, name: 'NSAIDs', category: 'Pain Relief', description: 'Non-steroidal anti-inflammatory drugs', createdAt: '2024-01-15' },
        { id: 2, name: 'Opioids', category: 'Pain Relief', description: 'Strong pain medications', createdAt: '2024-01-15' },
        { id: 3, name: 'Penicillins', category: 'Antibiotics', description: 'Penicillin-based antibiotics', createdAt: '2024-01-15' },
        { id: 4, name: 'Cephalosporins', category: 'Antibiotics', description: 'Cephalosporin antibiotics', createdAt: '2024-01-15' },
        { id: 5, name: 'Vitamin D', category: 'Vitamins & Supplements', description: 'Vitamin D supplements', createdAt: '2024-01-15' },
    ]);

    const categories = ['Pain Relief', 'Antibiotics', 'Vitamins & Supplements', 'Cardiovascular', 'Respiratory'];

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        category: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSubcategory) {
            setSubcategories(subcategories.map(sub => 
                sub.id === editingSubcategory.id 
                    ? { ...sub, name: data.name, category: data.category, description: data.description }
                    : sub
            ));
        } else {
            const newSubcategory = {
                id: subcategories.length + 1,
                name: data.name,
                category: data.category,
                description: data.description,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setSubcategories([...subcategories, newSubcategory]);
        }
        reset();
        setEditingSubcategory(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (subcategory: any) => {
        setEditingSubcategory(subcategory);
        setData({
            name: subcategory.name,
            category: subcategory.category,
            description: subcategory.description,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this subcategory?')) {
            setSubcategories(subcategories.filter(sub => sub.id !== id));
        }
    };

    const filteredSubcategories = subcategories.filter(sub =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Subcategory
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingSubcategory 
                                        ? 'Update the subcategory information below.'
                                        : 'Create a new medicine subcategory for your inventory.'
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Subcategory Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., NSAIDs"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of the subcategory"
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
                                            setEditingSubcategory(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-purple-600 hover:bg-purple-700">
                                        {editingSubcategory ? 'Update' : 'Create'} Subcategory
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
                            placeholder="Search subcategories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSubcategories.map((subcategory) => (
                        <Card key={subcategory.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <Package className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{subcategory.name}</h3>
                                        <p className="text-xs text-purple-600">{subcategory.category}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{subcategory.description}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(subcategory)}
                                    className="flex-1"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(subcategory.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredSubcategories.length === 0 && (
                    <Card className="p-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No subcategories found matching your search.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

