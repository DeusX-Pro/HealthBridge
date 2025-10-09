import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/patient-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { User, Mail, Phone, Calendar, MapPin, Heart, AlertCircle, Users, Shield, Save, X, Upload, Camera, Plus, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Profile',
        href: '#',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

interface Patient {
    id: number;
    user_id: number;
    uuid: string;
    blood_type: string | null;
    allergies: string | null;
    chronic_conditions: string | null;
    emergency_contact_name: string | null;
    emergency_contact_phone: string | null;
    status: 'active' | 'pending' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface UserData {
    id: number;
    uuid: string;
    name: string;
    email: string;
    phone_number: string;
    date_of_birth: string | null;
    email_verified_at: string | null;
    role: 'admin' | 'patient' | 'doctor';
    profile_picture: string | null;
    country: string | null;
    status: 'active' | 'pending' | 'inactive';
    gender: 'male' | 'female' | 'other' | null;
    bio: string | null;
    created_at: string;
    patient?: Patient;
}

interface PageProps {
    user: UserData;
    [key: string]: any;
}

export default function EditProfile() {
    const { user } = usePage<PageProps>().props;
    const patient = user.patient;
    const [previewImage, setPreviewImage] = useState<string | null>(user.profile_picture);
    const [processing, setProcessing] = useState(false);

    // Parse allergies and chronic conditions from string to array
    const parseToArray = (value: string | null): string[] => {
        if (!value) return [''];
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [value];
        } catch {
            return value.split(',').map(item => item.trim()).filter(Boolean);
        }
    };

    const [allergies, setAllergies] = useState<string[]>(parseToArray(patient?.allergies ?? null));
    const [chronicConditions, setChronicConditions] = useState<string[]>(parseToArray(patient?.chronic_conditions ?? null));

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        date_of_birth: user.date_of_birth || '',
        country: user.country || '',
        gender: user.gender || '',
        bio: user.bio || '',
        profile_picture: null as File | null,
        
        // Patient fields
        blood_type: patient?.blood_type || '',
        emergency_contact_name: patient?.emergency_contact_name || '',
        emergency_contact_phone: patient?.emergency_contact_phone || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, profile_picture: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Allergies handlers
    const addAllergy = () => {
        setAllergies([...allergies, '']);
    };

    const removeAllergy = (index: number) => {
        const newAllergies = allergies.filter((_, i) => i !== index);
        setAllergies(newAllergies.length > 0 ? newAllergies : ['']);
    };

    const updateAllergy = (index: number, value: string) => {
        const newAllergies = [...allergies];
        newAllergies[index] = value;
        setAllergies(newAllergies);
    };

    // Chronic conditions handlers
    const addChronicCondition = () => {
        setChronicConditions([...chronicConditions, '']);
    };

    const removeChronicCondition = (index: number) => {
        const newConditions = chronicConditions.filter((_, i) => i !== index);
        setChronicConditions(newConditions.length > 0 ? newConditions : ['']);
    };

    const updateChronicCondition = (index: number, value: string) => {
        const newConditions = [...chronicConditions];
        newConditions[index] = value;
        setChronicConditions(newConditions);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        
        try {
            const submitData = new FormData();
            
            // Append all form fields
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone_number', formData.phone_number);
            submitData.append('date_of_birth', formData.date_of_birth);
            submitData.append('country', formData.country);
            submitData.append('gender', formData.gender);
            submitData.append('bio', formData.bio);
            
            // Append profile picture if selected
            if (formData.profile_picture) {
                submitData.append('profile_picture', formData.profile_picture);
            }
            
            // Append patient fields
            submitData.append('blood_type', formData.blood_type);
            submitData.append('emergency_contact_name', formData.emergency_contact_name);
            submitData.append('emergency_contact_phone', formData.emergency_contact_phone);
            
            // Filter and append allergies array
            const filteredAllergies = allergies.filter(a => a.trim() !== '');
            filteredAllergies.forEach((allergy, index) => {
                submitData.append(`allergies[${index}]`, allergy);
            });
            
            // Filter and append chronic conditions array
            const filteredConditions = chronicConditions.filter(c => c.trim() !== '');
            filteredConditions.forEach((condition, index) => {
                submitData.append(`chronic_conditions[${index}]`, condition);
            });
            
            // Submit using Inertia router
            router.post('/patient/profile/update', submitData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setProcessing(false);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
            });
        } catch (error) {
            setProcessing(false);
            console.error('Submission error:', error);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const updateFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Profile" />

            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">Edit Profile</h1>
                        <p className="text-gray-600 mt-1">Update your personal and medical information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">{/* @csrf token will be handled by Inertia */}

                {/* Profile Picture Section */}
                <Card className="p-6 border-0 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                            <Camera className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Profile Picture</h3>
                            <p className="text-sm text-gray-500">Update your profile photo</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Profile preview"
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-100 shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-4 border-gray-100 shadow-lg">
                                <span className="text-4xl font-semibold text-white">
                                    {getInitials(user.name || 'U')}
                                </span>
                            </div>
                        )}
                        
                        <div className="flex-1">
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                                    <Upload className="w-4 h-4" />
                                    Upload New Photo
                                </div>
                            </label>
                            <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                            {errors.profile_picture && (
                                <p className="text-sm text-red-600 mt-1">{errors.profile_picture}</p>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Personal Information */}
                <Card className="p-6 border-0 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                            <p className="text-sm text-gray-500">Update your personal details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateFormData('name', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormData('email', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={(e) => updateFormData('phone_number', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            {errors.phone_number && (
                                <p className="text-sm text-red-600 mt-1">{errors.phone_number}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="date"
                                    value={formData.date_of_birth}
                                    onChange={(e) => updateFormData('date_of_birth', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                            {errors.date_of_birth && (
                                <p className="text-sm text-red-600 mt-1">{errors.date_of_birth}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => updateFormData('gender', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => updateFormData('country', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your country"
                                />
                            </div>
                            {errors.country && (
                                <p className="text-sm text-red-600 mt-1">{errors.country}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio
                            </label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => updateFormData('bio', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                                placeholder="Tell us about yourself..."
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-600 mt-1">{errors.bio}</p>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Medical Information */}
                {patient && (
                    <Card className="p-6 border-0 shadow-xl bg-gradient-to-br from-rose-50 via-red-50 to-orange-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
                                <p className="text-sm text-rose-600 font-medium">Update your health records</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blood Type
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        value={formData.blood_type}
                                        onChange={(e) => updateFormData('blood_type', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option value="">Select blood type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                {errors.blood_type && (
                                    <p className="text-sm text-red-600 mt-1">{errors.blood_type}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Allergies
                                    </label>
                                    <Button
                                        type="button"
                                        onClick={addAllergy}
                                        className="h-8 px-3 bg-orange-600 hover:bg-orange-700 text-white text-sm"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Allergy
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {allergies.map((allergy, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="relative flex-1">
                                                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={allergy}
                                                    onChange={(e) => updateAllergy(index, e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                                                    placeholder="e.g., Peanuts, Penicillin, etc."
                                                />
                                            </div>
                                            {allergies.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => removeAllergy(index)}
                                                    variant="outline"
                                                    className="h-11 px-3 border-red-300 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.allergies && (
                                    <p className="text-sm text-red-600 mt-1">{errors.allergies}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Chronic Conditions
                                    </label>
                                    <Button
                                        type="button"
                                        onClick={addChronicCondition}
                                        className="h-8 px-3 bg-pink-600 hover:bg-pink-700 text-white text-sm"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Condition
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {chronicConditions.map((condition, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={condition}
                                                    onChange={(e) => updateChronicCondition(index, e.target.value)}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all bg-white"
                                                    placeholder="e.g., Diabetes, Hypertension, etc."
                                                />
                                            </div>
                                            {chronicConditions.length > 1 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => removeChronicCondition(index)}
                                                    variant="outline"
                                                    className="h-11 px-3 border-red-300 text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {errors.chronic_conditions && (
                                    <p className="text-sm text-red-600 mt-1">{errors.chronic_conditions}</p>
                                )}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Emergency Contact */}
                {patient && (
                    <Card className="p-6 border-2 border-red-200 shadow-xl bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Emergency Contact</h3>
                                <p className="text-sm text-red-600 font-medium">Person to contact in case of emergency</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.emergency_contact_name}
                                        onChange={(e) => updateFormData('emergency_contact_name', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                                        placeholder="Emergency contact name"
                                    />
                                </div>
                                {errors.emergency_contact_name && (
                                    <p className="text-sm text-red-600 mt-1">{errors.emergency_contact_name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Phone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={formData.emergency_contact_phone}
                                        onChange={(e) => updateFormData('emergency_contact_phone', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                {errors.emergency_contact_phone && (
                                    <p className="text-sm text-red-600 mt-1">{errors.emergency_contact_phone}</p>
                                )}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="px-6"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        disabled={processing}
                        className="px-6 bg-green-600 hover:bg-green-700 text-white shadow-lg"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
            </div>
        </AppLayout>
    );
}