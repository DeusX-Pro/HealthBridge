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

export default function MedicinesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMedicine, setEditingMedicine] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [medicines, setMedicines] = useState([
        { 
            id: 1, 
            name: 'Paracetamol 500mg', 
            category: 'Pain Relief', 
            subcategory: 'NSAIDs',
            brand: 'Pfizer',
            stock: 150,
            minStock: 50,
            price: 500,
            expiryDate: '2025-12-31',
            createdAt: '2024-01-15'
        },
        { 
            id: 2, 
            name: 'Amoxicillin 250mg', 
            category: 'Antibiotics', 
            subcategory: 'Penicillins',
            brand: 'GlaxoSmithKline',
            stock: 45,
            minStock: 30,
            price: 1200,
            expiryDate: '2025-10-15',
            createdAt: '2024-01-15'
        },
        { 
            id: 3, 
            name: 'Vitamin D3 1000IU', 
            category: 'Vitamins & Supplements', 
            subcategory: 'Vitamin D',
            brand: 'Novartis',
            stock: 200,
            minStock: 40,
            price: 2500,
            expiryDate: '2026-03-20',
            createdAt: '2024-01-15'
        },
    ]);

    const categories = ['Pain Relief', 'Antibiotics', 'Vitamins & Supplements', 'Cardiovascular', 'Respiratory'];
    const subcategories = ['NSAIDs', 'Opioids', 'Penicillins', 'Cephalosporins', 'Vitamin D'];
    const brands = ['Pfizer', 'GlaxoSmithKline', 'Novartis', 'Roche', 'Merck'];

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        category: '',
        subcategory: '',
        brand: '',
        stock: '',
        minStock: '',
        price: '',
        expiryDate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMedicine) {
            setMedicines(medicines.map(med => 
                med.id === editingMedicine.id 
                    ? { 
                        ...med, 
                        name: data.name, 
                        category: data.category,
                        subcategory: data.subcategory,
                        brand: data.brand,
                        stock: parseInt(data.stock),
                        minStock: parseInt(data.minStock),
                        price: parseFloat(data.price),
                        expiryDate: data.expiryDate,
                    }
                    : med
            ));
        } else {
            const newMedicine = {
                id: medicines.length + 1,
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                brand: data.brand,
                stock: parseInt(data.stock),
                minStock: parseInt(data.minStock),
                price: parseFloat(data.price),
                expiryDate: data.expiryDate,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setMedicines([...medicines, newMedicine]);
        }
        reset();
        setEditingMedicine(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (medicine: any) => {
        setEditingMedicine(medicine);
        setData({
            name: medicine.name,
            category: medicine.category,
            subcategory: medicine.subcategory,
            brand: medicine.brand,
            stock: medicine.stock.toString(),
            minStock: medicine.minStock.toString(),
            price: medicine.price.toString(),
            expiryDate: medicine.expiryDate,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this medicine?')) {
            setMedicines(medicines.filter(med => med.id !== id));
        }
    };

    const filteredMedicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Medicine
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingMedicine 
                                        ? 'Update the medicine information below.'
                                        : 'Add a new medicine to your inventory.'
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Medicine Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g., Paracetamol 500mg"
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
                                                <option value="">Select category</option>
                                                {categories.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="subcategory">Subcategory</Label>
                                            <select
                                                id="subcategory"
                                                value={data.subcategory}
                                                onChange={(e) => setData('subcategory', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">Select subcategory</option>
                                                {subcategories.map(sub => (
                                                    <option key={sub} value={sub}>{sub}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand</Label>
                                            <select
                                                id="brand"
                                                value={data.brand}
                                                onChange={(e) => setData('brand', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                                required
                                            >
                                                <option value="">Select brand</option>
                                                {brands.map(brand => (
                                                    <option key={brand} value={brand}>{brand}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="stock">Current Stock</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => setData('stock', e.target.value)}
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="minStock">Min Stock</Label>
                                            <Input
                                                id="minStock"
                                                type="number"
                                                value={data.minStock}
                                                onChange={(e) => setData('minStock', e.target.value)}
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price (₦)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                        <Input
                                            id="expiryDate"
                                            type="date"
                                            value={data.expiryDate}
                                            onChange={(e) => setData('expiryDate', e.target.value)}
                                            required
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
                                            setEditingMedicine(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-purple-600 hover:bg-purple-700">
                                        {editingMedicine ? 'Update' : 'Create'} Medicine
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
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredMedicines.map((medicine) => {
                        const isLowStock = medicine.stock <= medicine.minStock;
                        return (
                            <Card key={medicine.id} className={`p-6 hover:shadow-md transition-shadow ${isLowStock ? 'border-red-200 bg-red-50/50' : ''}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isLowStock ? 'bg-red-100' : 'bg-purple-100'}`}>
                                            <Pill className={`h-6 w-6 ${isLowStock ? 'text-red-600' : 'text-purple-600'}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{medicine.name}</h3>
                                            <p className="text-xs text-purple-600">{medicine.brand}</p>
                                        </div>
                                    </div>
                                    {isLowStock && (
                                        <AlertCircle className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-medium">{medicine.category}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Stock:</span>
                                        <span className={`font-medium ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                                            {medicine.stock} / Min: {medicine.minStock}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Price:</span>
                                        <span className="font-medium">₦{medicine.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Expiry:</span>
                                        <span className="font-medium">{medicine.expiryDate}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(medicine)}
                                        className="flex-1"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(medicine.id)}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {filteredMedicines.length === 0 && (
                    <Card className="p-12 text-center">
                        <Pill className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No medicines found matching your search.
                        </p>
                    </Card>
                )}
            </div>
        </PharmacyLayout>
    );
}

