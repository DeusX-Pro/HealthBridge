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
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/pharmacy/dashboard' },
    { title: 'Inventory', href: '/pharmacy/inventory' },
    { title: 'Categories' },
];

export default function CategoriesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [categories, setCategories] = useState([
        { id: 1, name: 'Pain Relief', description: 'Medications for pain management', createdAt: '2024-01-15' },
        { id: 2, name: 'Antibiotics', description: 'Antibacterial medications', createdAt: '2024-01-15' },
        { id: 3, name: 'Vitamins & Supplements', description: 'Nutritional supplements', createdAt: '2024-01-15' },
        { id: 4, name: 'Cardiovascular', description: 'Heart and blood pressure medications', createdAt: '2024-01-15' },
        { id: 5, name: 'Respiratory', description: 'Asthma and respiratory medications', createdAt: '2024-01-15' },
    ]);

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            // Update category
            setCategories(categories.map(cat => 
                cat.id === editingCategory.id 
                    ? { ...cat, name: data.name, description: data.description }
                    : cat
            ));
        } else {
            // Create new category
            const newCategory = {
                id: categories.length + 1,
                name: data.name,
                description: data.description,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setCategories([...categories, newCategory]);
        }
        reset();
        setEditingCategory(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (category: any) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            description: category.description,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PharmacyLayout breadcrumbs={breadcrumbs}>
            <Head title="Medicine Categories" />

            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Medicine Categories</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage medicine categories for your inventory
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingCategory 
                                        ? 'Update the category information below.'
                                        : 'Create a new medicine category for your inventory.'
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Category Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Pain Relief"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of the category"
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
                                            setEditingCategory(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-purple-600 hover:bg-purple-700">
                                        {editingCategory ? 'Update' : 'Create'} Category
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                {/* Categories Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCategories.map((category) => (
                        <Card key={category.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <Package className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                        <p className="text-xs text-gray-500">Created {category.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(category)}
                                    className="flex-1"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(category.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <Card className="p-12 text-center">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No categories found matching your search.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

