import MedicalLabLayout from '@/layouts/medical-lab-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import medicalLab from '@/routes/medical-lab';
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
    Upload,
    Search,
    FileText,
    CheckCircle2,
    Clock,
    Eye,
    ChevronRight,
    FlaskConical
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Upload Results', href: medicalLab.uploadResults.store(0).url },
];

interface Result {
    id: number;
    order: {
        id: number;
        patient: {
            user: {
                name: string;
                email: string;
            }
        };
        service: {
            name: string;
        };
    };
    performed_at: string;
    file_path?: string;
}

export default function UploadResultsPage() {
    const { results } = usePage<{ results: Result[] }>().props;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        file: null as File | null,
        result_data: {} as any,
    });

    const handleUploadClick = (orderId: number) => {
        setSelectedOrder(orderId);
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(medicalLab.uploadResults.store(selectedOrder).url, {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset();
            },
        });
    };

    const filteredResults = results.filter(result =>
        result.order.patient.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.order.service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Lab Results" />

            <div className="flex flex-col gap-6 pb-12">
                <div className="relative overflow-hidden rounded-2xl bg-teal-600 p-8 text-white shadow-xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                                <Upload className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight">Result Portal</h1>
                                <p className="text-teal-100 font-medium">Securely upload and share diagnostic outcomes</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-center min-w-[100px]">
                                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-teal-200">Total Uploads</p>
                                <p className="text-2xl font-black">{results.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="p-4 border-none shadow-md">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search by patient name or test type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 bg-gray-50 border-none focus-visible:ring-teal-500 rounded-xl"
                        />
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredResults.map((result) => (
                        <Card key={result.id} className="group overflow-hidden border-none shadow-lg transition-all hover:shadow-xl">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Live
                                    </span>
                                </div>
                                
                                <div className="mb-6">
                                    <h3 className="text-xl font-black text-gray-900 mb-1">{result.order.service.name}</h3>
                                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                                        <FlaskConical className="h-4 w-4 text-teal-500" />
                                        {result.order.patient.user.name}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className="text-xs font-bold text-gray-400">
                                        {new Date(result.performed_at).toLocaleDateString()}
                                    </span>
                                    <Button variant="ghost" size="sm" className="font-bold text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg">
                                        View Result
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredResults.length === 0 && (
                    <Card className="p-20 text-center border-dashed border-2 bg-gray-50/50">
                        <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                            <FileText className="h-10 w-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">
                            Completed tests that have results uploaded will appear here permanently.
                        </p>
                    </Card>
                )}

                {/* Upload Action (Integrated into Orders now, but kept for standalone if needed) */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="rounded-3xl border-none shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tight">Upload Diagnostic Report</DialogTitle>
                            <DialogDescription className="font-semibold text-gray-500">
                                Please attach the official PDF report for patient review.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="file" className="text-xs font-black uppercase tracking-widest text-gray-400">PDF Report</Label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-2xl hover:border-teal-500 transition-colors bg-gray-50/50">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-10 w-10 text-gray-300" />
                                        <div className="flex text-sm text-gray-600">
                                            <input
                                                id="file"
                                                type="file"
                                                className="sr-only"
                                                accept=".pdf,.png,.jpg"
                                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                            />
                                            <label htmlFor="file" className="relative cursor-pointer bg-transparent rounded-md font-bold text-teal-600 hover:text-teal-500 focus-within:outline-none">
                                                <span>Click to upload</span>
                                            </label>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">PDF, PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                                {data.file && (
                                    <p className="text-xs font-bold text-teal-600 flex items-center gap-1 mt-2">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {data.file.name} ready for upload
                                    </p>
                                )}
                            </div>
                            
                            <DialogFooter className="gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="font-bold text-gray-400"
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        reset();
                                    }}
                                >
                                    Discard
                                </Button>
                                <Button type="submit" disabled={processing || !data.file} className="bg-teal-600 hover:bg-teal-700 h-12 px-8 rounded-xl font-bold shadow-lg shadow-teal-100">
                                    {processing ? 'Uploading...' : 'Publish Results'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </MedicalLabLayout>
    );
}
