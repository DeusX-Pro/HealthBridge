import MedicalLabLayout from '@/layouts/medical-lab-layout';
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
    Microscope,
    Plus,
    Edit,
    Trash2,
    Search,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Services' },
];

export default function ServicesPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [services, setServices] = useState([
        { 
            id: 1, 
            name: 'Complete Blood Count (CBC)', 
            category: 'Hematology',
            description: 'Full blood count test including red cells, white cells, and platelets',
            price: 15000,
            duration: '24 hours',
            status: 'active',
            createdAt: '2024-01-15'
        },
        { 
            id: 2, 
            name: 'Lipid Panel', 
            category: 'Chemistry',
            description: 'Cholesterol and triglyceride levels test',
            price: 12000,
            duration: '24 hours',
            status: 'active',
            createdAt: '2024-01-15'
        },
        { 
            id: 3, 
            name: 'Liver Function Test (LFT)', 
            category: 'Chemistry',
            description: 'Comprehensive liver function assessment',
            price: 18000,
            duration: '48 hours',
            status: 'active',
            createdAt: '2024-01-15'
        },
        { 
            id: 4, 
            name: 'Urinalysis', 
            category: 'Urine Analysis',
            description: 'Complete urine analysis and culture',
            price: 8000,
            duration: '24 hours',
            status: 'active',
            createdAt: '2024-01-15'
        },
        { 
            id: 5, 
            name: 'X-Ray Chest', 
            category: 'Radiology',
            description: 'Chest X-ray examination',
            price: 25000,
            duration: '2 hours',
            status: 'active',
            createdAt: '2024-01-15'
        },
    ]);

    const categories = ['Hematology', 'Chemistry', 'Urine Analysis', 'Radiology', 'Microbiology', 'Immunology'];

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        category: '',
        description: '',
        price: '',
        duration: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            setServices(services.map(service => 
                service.id === editingService.id 
                    ? { 
                        ...service, 
                        name: data.name, 
                        category: data.category,
                        description: data.description,
                        price: parseFloat(data.price),
                        duration: data.duration,
                        status: data.status,
                    }
                    : service
            ));
        } else {
            const newService = {
                id: services.length + 1,
                name: data.name,
                category: data.category,
                description: data.description,
                price: parseFloat(data.price),
                duration: data.duration,
                status: data.status,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setServices([...services, newService]);
        }
        reset();
        setEditingService(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (service: any) => {
        setEditingService(service);
        setData({
            name: service.name,
            category: service.category,
            description: service.description,
            price: service.price.toString(),
            duration: service.duration,
            status: service.status,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== id));
        }
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Lab Services Management" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Lab Services Management</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Manage your laboratory services and tests
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-teal-600 hover:bg-teal-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingService ? 'Edit Service' : 'Add New Service'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingService 
                                        ? 'Update the service information below.'
                                        : 'Add a new laboratory service to your offerings.'
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Service Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                placeholder="e.g., Complete Blood Count"
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
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief description of the service"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
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
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input
                                                id="duration"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                placeholder="e.g., 24 hours"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
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
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsDialogOpen(false);
                                            reset();
                                            setEditingService(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="bg-teal-600 hover:bg-teal-700">
                                        {editingService ? 'Update' : 'Create'} Service
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
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <Card key={service.id} className="p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                                        <Microscope className="h-6 w-6 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                        <p className="text-xs text-teal-600">{service.category}</p>
                                    </div>
                                </div>
                                {service.status === 'active' && (
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-medium">₦{service.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium">{service.duration}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium ${service.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                                        {service.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(service)}
                                    className="flex-1"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(service.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <Card className="p-12 text-center">
                        <Microscope className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No services found matching your search.
                        </p>
                    </Card>
                )}
            </div>
        </MedicalLabLayout>
    );
}

