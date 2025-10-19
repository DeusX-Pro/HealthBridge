import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Clock,
    Calendar,
    Plus,
    Trash2,
    Save,
    RefreshCw,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/doctor-layout';

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${period}`;
});

export default function Availability() {
    const [saveStatus, setSaveStatus] = useState('');
    const [availability, setAvailability] = useState(
        daysOfWeek.map((day) => ({
            day,
            enabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
            slots: [{ start: '9:00 AM', end: '5:00 PM' }],
        }))
    );

    const [consultationSettings, setConsultationSettings] = useState({
        slotDuration: '30',
        bufferTime: '10',
        maxDailyAppointments: '20',
        advanceBooking: '30',
    });

    const toggleDay = (index: number) => {
        const newAvailability = [...availability];
        newAvailability[index].enabled = !newAvailability[index].enabled;
        setAvailability(newAvailability);
    };

    const addTimeSlot = (dayIndex: number) => {
        const newAvailability = [...availability];
        newAvailability[dayIndex].slots.push({ start: '9:00 AM', end: '5:00 PM' });
        setAvailability(newAvailability);
    };

    const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
        const newAvailability = [...availability];
        newAvailability[dayIndex].slots.splice(slotIndex, 1);
        setAvailability(newAvailability);
    };

    const updateTimeSlot = (dayIndex: number, slotIndex: number, field: string, value: string) => {
        const newAvailability = [...availability];
        newAvailability[dayIndex].slots[slotIndex][field as 'start' | 'end'] = value;
        setAvailability(newAvailability);
    };

    const handleSave = () => {
        setSaveStatus('saving');
        // Here you would typically make an API call to save the data
        setTimeout(() => {
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(''), 3000);
        }, 1000);
    };

    const copyToAllDays = (dayIndex: number) => {
        const sourceDay = availability[dayIndex];
        const newAvailability = availability.map((day) => ({
            ...day,
            slots: JSON.parse(JSON.stringify(sourceDay.slots)),
        }));
        setAvailability(newAvailability);
    };

    const breadcrumbs = [
        { title: 'Dashboard', href: '/doctor/dashboard' },
        { title: 'Availability', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Availability Management
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Set your working hours and manage your consultation schedule
                        </p>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={saveStatus === 'saving'}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        {saveStatus === 'saving' ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>

                {/* Success Alert */}
                {saveStatus === 'success' && (
                    <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            Your availability has been updated successfully!
                        </AlertDescription>
                    </Alert>
                )}

                {/* Consultation Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Consultation Settings
                        </CardTitle>
                        <CardDescription>
                            Configure your appointment duration and booking preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Slot Duration
                                </label>
                                <select
                                    value={consultationSettings.slotDuration}
                                    onChange={(e) =>
                                        setConsultationSettings({
                                            ...consultationSettings,
                                            slotDuration: e.target.value,
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">60 minutes</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Buffer Time
                                </label>
                                <select
                                    value={consultationSettings.bufferTime}
                                    onChange={(e) =>
                                        setConsultationSettings({
                                            ...consultationSettings,
                                            bufferTime: e.target.value,
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="0">No buffer</option>
                                    <option value="5">5 minutes</option>
                                    <option value="10">10 minutes</option>
                                    <option value="15">15 minutes</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Max Daily Appointments
                                </label>
                                <select
                                    value={consultationSettings.maxDailyAppointments}
                                    onChange={(e) =>
                                        setConsultationSettings({
                                            ...consultationSettings,
                                            maxDailyAppointments: e.target.value,
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="10">10 patients</option>
                                    <option value="15">15 patients</option>
                                    <option value="20">20 patients</option>
                                    <option value="25">25 patients</option>
                                    <option value="30">30 patients</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Advance Booking
                                </label>
                                <select
                                    value={consultationSettings.advanceBooking}
                                    onChange={(e) =>
                                        setConsultationSettings({
                                            ...consultationSettings,
                                            advanceBooking: e.target.value,
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="7">7 days</option>
                                    <option value="14">14 days</option>
                                    <option value="30">30 days</option>
                                    <option value="60">60 days</option>
                                    <option value="90">90 days</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            Weekly Schedule
                        </CardTitle>
                        <CardDescription>
                            Set your available hours for each day of the week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {availability.map((dayData, dayIndex) => (
                                <div
                                    key={dayData.day}
                                    className={`rounded-lg border p-4 transition-colors ${
                                        dayData.enabled
                                            ? 'border-blue-200 bg-blue-50/50'
                                            : 'border-gray-200 bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => toggleDay(dayIndex)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                    dayData.enabled
                                                        ? 'bg-blue-600'
                                                        : 'bg-gray-300'
                                                }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                        dayData.enabled
                                                            ? 'translate-x-6'
                                                            : 'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                            <span
                                                className={`font-semibold ${
                                                    dayData.enabled
                                                        ? 'text-gray-900'
                                                        : 'text-gray-400'
                                                }`}
                                            >
                                                {dayData.day}
                                            </span>
                                        </div>
                                        {dayData.enabled && (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => copyToAllDays(dayIndex)}
                                                    className="text-xs"
                                                >
                                                    <RefreshCw className="mr-1 h-3 w-3" />
                                                    Copy to all days
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => addTimeSlot(dayIndex)}
                                                    className="text-xs"
                                                >
                                                    <Plus className="mr-1 h-3 w-3" />
                                                    Add slot
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {dayData.enabled && (
                                        <div className="space-y-3">
                                            {dayData.slots.map((slot, slotIndex) => (
                                                <div
                                                    key={slotIndex}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className="flex flex-1 items-center gap-3">
                                                        <select
                                                            value={slot.start}
                                                            onChange={(e) =>
                                                                updateTimeSlot(
                                                                    dayIndex,
                                                                    slotIndex,
                                                                    'start',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                        >
                                                            {timeSlots.map((time) => (
                                                                <option key={time} value={time}>
                                                                    {time}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <span className="text-gray-400">to</span>

                                                        <select
                                                            value={slot.end}
                                                            onChange={(e) =>
                                                                updateTimeSlot(
                                                                    dayIndex,
                                                                    slotIndex,
                                                                    'end',
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                                        >
                                                            {timeSlots.map((time) => (
                                                                <option key={time} value={time}>
                                                                    {time}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {dayData.slots.length > 1 && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                removeTimeSlot(dayIndex, slotIndex)
                                                            }
                                                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {!dayData.enabled && (
                                        <p className="text-sm text-gray-400 italic">
                                            Not available on this day
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Alert */}
                <Alert>
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                        Changes will be reflected immediately after saving. Patients will be able
                        to book appointments based on your updated availability.
                    </AlertDescription>
                </Alert>
            </div>
        </AppLayout>
    );
}