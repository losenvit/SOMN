import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { competitionAPI, participantAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, MapPin, Trophy, Users, ArrowLeft } from 'lucide-react';

interface Competition {
  id: number;
  name: string;
  description: string;
  sport_type: string;
  start_date: string;
  end_date?: string;
  location?: string;
  status: string;
}

interface Participant {
  id: number;
  name: string;
  team?: string;
  email?: string;
  registration_date: string;
}

export default function CompetitionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [participantTeam, setParticipantTeam] = useState('');
  const [participantEmail, setParticipantEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchCompetitionDetails();
    }
  }, [id]);

  const fetchCompetitionDetails = async () => {
    try {
      const compData = await competitionAPI.getById(Number(id));
      setCompetition(compData);
      const partData = await participantAPI.getByCompetition(Number(id));
      setParticipants(partData);
    } catch (err: any) {
      setError('Failed to load competition details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await participantAPI.create({
        competition_id: Number(id),
        name: participantName,
        team: participantTeam || null,
        email: participantEmail || null,
      });
      setParticipantName('');
      setParticipantTeam('');
      setParticipantEmail('');
      setShowAddForm(false);
      fetchCompetitionDetails();
    } catch (err: any) {
      alert('Failed to add participant');
    }
  };

  const handleDeleteParticipant = async (participantId: number) => {
    if (!confirm('Are you sure you want to remove this participant?')) return;
    try {
      await participantAPI.delete(participantId);
      setParticipants(participants.filter(p => p.id !== participantId));
    } catch (err: any) {
      alert('Failed to remove participant');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Competition not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Button variant="ghost" onClick={() => navigate('/competitions')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Competitions
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{competition.name}</CardTitle>
                <CardDescription className="mt-2">{competition.description}</CardDescription>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                competition.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                competition.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {competition.status}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <Trophy className="mr-2 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Sport Type</p>
                  <p className="font-medium">{competition.sport_type}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{new Date(competition.start_date).toLocaleDateString()}</p>
                </div>
              </div>
              {competition.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-2 h-5 w-5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{competition.location}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <CardTitle>Participants ({participants.length})</CardTitle>
              </div>
              <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
                {showAddForm ? 'Cancel' : 'Add Participant'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <form onSubmit={handleAddParticipant} className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input
                      value={participantName}
                      onChange={(e) => setParticipantName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Team</label>
                    <Input
                      value={participantTeam}
                      onChange={(e) => setParticipantTeam(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={participantEmail}
                      onChange={(e) => setParticipantEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4" size="sm">
                  Add Participant
                </Button>
              </form>
            )}

            {participants.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No participants yet</p>
            ) : (
              <div className="space-y-2">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <div className="text-sm text-gray-500">
                        {participant.team && <span>Team: {participant.team}</span>}
                        {participant.team && participant.email && <span> • </span>}
                        {participant.email && <span>{participant.email}</span>}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteParticipant(participant.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
