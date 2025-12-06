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
    Upload,
    Search,
    FileText,
    CheckCircle2,
    Clock,
    Eye,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/medical-lab/dashboard' },
    { title: 'Upload Results' },
];

export default function UploadResultsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data
    const [results, setResults] = useState([
        {
            id: 1,
            orderNumber: 'LAB-2024-001',
            patientName: 'Sarah Williams',
            patientEmail: 'sarah@example.com',
            testType: 'Complete Blood Count (CBC)',
            doctorName: 'Dr. John Smith',
            orderDate: '2024-12-14',
            completedDate: '2024-12-15',
            status: 'ready',
            notes: 'All values within normal range',
        },
        {
            id: 2,
            orderNumber: 'LAB-2024-002',
            patientName: 'Robert Taylor',
            patientEmail: 'robert@example.com',
            testType: 'Urinalysis',
            doctorName: 'Dr. Jane Doe',
            orderDate: '2024-12-14',
            completedDate: '2024-12-15',
            status: 'ready',
            notes: 'No abnormalities detected',
        },
        {
            id: 3,
            orderNumber: 'LAB-2024-003',
            patientName: 'Emily Davis',
            patientEmail: 'emily@example.com',
            testType: 'Lipid Panel',
            doctorName: 'Dr. Michael Brown',
            orderDate: '2024-12-13',
            completedDate: '2024-12-14',
            status: 'uploaded',
            uploadedDate: '2024-12-14',
        },
    ]);

    const { data, setData, post, processing, reset } = useForm({
        resultFile: null as File | null,
        notes: '',
    });

    const handleUpload = (result: any) => {
        setSelectedResult(result);
        setData({
            resultFile: null,
            notes: result.notes || '',
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedResult) {
            setResults(results.map(result => 
                result.id === selectedResult.id 
                    ? { ...result, status: 'uploaded', uploadedDate: new Date().toISOString().split('T')[0] }
                    : result
            ));
        }
        reset();
        setSelectedResult(null);
        setIsDialogOpen(false);
    };

    const filteredResults = results.filter(result =>
        result.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.testType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MedicalLabLayout breadcrumbs={breadcrumbs}>
            <Head title="Upload Lab Results" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Upload Lab Results</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Upload test results for completed lab orders
                        </p>
                    </div>
                </div>

                <Card className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search results..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </Card>

                <div className="space-y-4">
                    {filteredResults.map((result) => (
                        <Card key={result.id} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{result.orderNumber}</h3>
                                        {result.status === 'uploaded' ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Uploaded
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                                                <Clock className="h-3 w-3" />
                                                Ready to Upload
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Completed on {result.completedDate}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4 space-y-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Patient Information</p>
                                    <p className="text-sm text-gray-600">{result.patientName}</p>
                                    <p className="text-sm text-gray-600">{result.patientEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Test Type</p>
                                    <p className="text-sm text-gray-600">{result.testType}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Ordered by</p>
                                    <p className="text-sm text-gray-600">{result.doctorName}</p>
                                </div>
                                {result.notes && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Test Notes</p>
                                        <p className="text-sm text-gray-600">{result.notes}</p>
                                    </div>
                                )}
                                {result.uploadedDate && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Uploaded Date</p>
                                        <p className="text-sm text-gray-600">{result.uploadedDate}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {result.status === 'ready' && (
                                    <Button
                                        size="sm"
                                        onClick={() => handleUpload(result)}
                                        className="bg-teal-600 hover:bg-teal-700"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Results
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="ml-auto"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredResults.length === 0 && (
                    <Card className="p-12 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-sm text-gray-600">
                            No results found matching your search.
                        </p>
                    </Card>
                )}

                {/* Upload Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Lab Results</DialogTitle>
                            <DialogDescription>
                                Upload the test results file for {selectedResult?.orderNumber}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="resultFile">Result File</Label>
                                    <Input
                                        id="resultFile"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => setData('resultFile', e.target.files?.[0] || null)}
                                        required
                                    />
                                    <p className="text-xs text-gray-500">
                                        Accepted formats: PDF, JPG, PNG (Max 10MB)
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Any additional notes or comments"
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
                                        setSelectedResult(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing || !data.resultFile} className="bg-teal-600 hover:bg-teal-700">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Results
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </MedicalLabLayout>
    );
}

