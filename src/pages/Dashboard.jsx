// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Pill
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold">{value}</h4>
          {trend && (
            <p className={`text-sm mt-1 ${trend.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value} {trend.type === 'up' ? '↑' : '↓'}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`text-${color}-500`} size={24} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { userRole } = useAuth();
  
  // Admin Dashboard
  const AdminDashboard = () => (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value="1,284"
          icon={Users}
          trend={{ value: "12%", type: "up" }}
          color="blue"
        />
        <StatCard
          title="Today's Appointments"
          value="42"
          icon={Calendar}
          trend={{ value: "8%", type: "up" }}
          color="green"
        />
        <StatCard
          title="Revenue (Monthly)"
          value="$85,420"
          icon={DollarSign}
          trend={{ value: "5%", type: "up" }}
          color="purple"
        />
        <StatCard
          title="Active Doctors"
          value="32"
          icon={Users}
          color="indigo"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Jane Cooper', date: 'Feb 10, 2025', status: 'Approved' },
                  { name: 'Wade Warren', date: 'Feb 9, 2025', status: 'Pending' },
                  { name: 'Esther Howard', date: 'Feb 8, 2025', status: 'Approved' },
                  { name: 'Cameron Williamson', date: 'Feb 7, 2025', status: 'Approved' },
                  { name: 'Brooklyn Simmons', date: 'Feb 6, 2025', status: 'Declined' },
                ].map((patient, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-3">{patient.name}</td>
                    <td className="py-3 text-gray-500">{patient.date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        patient.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { message: 'Server maintenance scheduled for tonight at 2 AM', type: 'warning' },
                { message: 'New feature: AI-powered diagnosis assistant is now live', type: 'info' },
                { message: 'Critical security update available for the billing system', type: 'danger' },
                { message: 'Backup completed successfully', type: 'success' },
              ].map((alert, i) => (
                <div key={i} className={`p-4 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' :
                  alert.type === 'info' ? 'bg-blue-50 border-l-4 border-blue-400' :
                  alert.type === 'danger' ? 'bg-red-50 border-l-4 border-red-400' :
                  'bg-green-50 border-l-4 border-green-400'
                }`}>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  // Doctor Dashboard
  const DoctorDashboard = () => (
    <div>
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Appointments"
          value="8"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Pending Reports"
          value="3"
          icon={FileText}
          color="amber"
        />
        <StatCard
          title="Patients Treated"
          value="142"
          icon={Users}
          trend={{ value: "15%", type: "up" }}
          color="green"
        />
        <StatCard
          title="Avg. Consultation Time"
          value="24 min"
          icon={Clock}
          color="purple"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Robert Fox', time: '9:00 AM', type: 'Follow-up' },
                  { name: 'Annette Black', time: '10:30 AM', type: 'Consultation' },
                  { name: 'Jenny Wilson', time: '1:15 PM', type: 'Check-up' },
                  { name: 'Darlene Robertson', time: '3:00 PM', type: 'Urgent' },
                  { name: 'Ralph Edwards', time: '4:30 PM', type: 'Follow-up' },
                ].map((appointment, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="py-3">{appointment.name}</td>
                    <td className="py-3 text-gray-500">{appointment.time}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.type === 'Urgent' ? 'bg-red-100 text-red-800' :
                        appointment.type === 'Consultation' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Most Common Conditions</h4>
                <div className="space-y-2">
                  {[
                    { condition: 'Hypertension', percentage: 24 },
                    { condition: 'Type 2 Diabetes', percentage: 18 },
                    { condition: 'Asthma', percentage: 14 },
                    { condition: 'Anxiety Disorders', percentage: 11 },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.condition}</span>
                        <span className="text-sm text-gray-500">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Age Distribution</h4>
                <div className="flex items-end h-32">
                  {[12, 28, 32, 15, 8].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${value * 2}px` }}
                      ></div>
                      <span className="text-xs mt-1">{['0-20', '21-40', '41-60', '61-80', '80+'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  // Patient Dashboard
  const PatientDashboard = () => (
    <div>
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Upcoming Appointments"
          value="2"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Pending Prescriptions"
          value="1"
          icon={FileText}
          color="amber"
        />
        <StatCard
          title="Medical Bills"
          value="$310"
          icon={DollarSign}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Annual Physical Check-up', 
                  date: 'Due in 2 weeks',
                  description: 'Your yearly comprehensive health examination'
                },
                { 
                  title: 'Medication Refill: Atorvastatin', 
                  date: 'Due in 5 days',
                  description: 'Cholesterol medication needs refill'
                },
                { 
                  title: 'Lab Tests Results', 
                  date: 'Ready for review',
                  description: 'Your recent blood work results are available'
                }
              ].map((reminder, i) => (
                <div key={i} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                  <h3 className="font-medium">{reminder.title}</h3>
                  <p className="text-blue-700 text-sm mb-1">{reminder.date}</p>
                  <p className="text-gray-600 text-sm">{reminder.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simple mock graph */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Blood Pressure</span>
                  <span className="text-sm text-gray-500">Last 6 months</span>
                </div>
                <div className="relative h-24">
                  <div className="absolute inset-0 flex items-end">
                    {[125, 128, 130, 126, 127, 125].map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-2 bg-blue-500 rounded-t"
                          style={{ height: `${(value - 110) * 2}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Weight (kg)</span>
                  <span className="text-sm text-green-500">-2.5 kg</span>
                </div>
                <div className="relative h-24">
                  <div className="absolute inset-0 flex items-end">
                    {[78, 77.5, 76.8, 76, 75.5, 75.5].map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-2 bg-green-500 rounded-t"
                          style={{ height: `${(value - 70) * 4}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                  <span>Jan</span>
                  <span>Feb</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  // Render dashboard based on user role
  switch (userRole) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
    default:
      return <PatientDashboard />;
  }
};

export default Dashboard;