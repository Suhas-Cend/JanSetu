import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabaseClient';

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    Home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    PlusCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
      </svg>
    ),
    ShieldCheck: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    Award: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    User: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    LogOut: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
      </svg>
    ),
    MapPin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    Flame: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/>
      </svg>
    ),
    CheckCircle2: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    XCircle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
      </svg>
    ),
    UploadCloud: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>
      </svg>
    ),
    Clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    Coins: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="m7 6 2.5 4"/>
      </svg>
    ),
    ArrowLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
    ),
    Layers: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 17 22 12"/>
      </svg>
    ),
    RefreshCw: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>
      </svg>
    )
  };
  return icons[name] || null;
};

const INITIAL_ISSUES = [
  {
    id: "ISS-9821",
    title: "Deep Pothole Hazard near 4th Cross Signal",
    description: "Multiple two-wheelers skidded last night due to continuous water leakage eroding the main asphalt layer right before the signal turning.",
    category: "Roads",
    location: "Indiranagar 100ft Road, Ward 112",
    severity: "Major",
    anumodanCount: 142,
    hasVoted: false,
    isTracked: true,
    status: "Pending",
    claimedBy: null,
    image: "[https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80](https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80)",
    date: "23 Sep 2026"
  }
];

const LEADERBOARD_OFFICERS = [
  { rank: 1, name: "Er. Ramesh Kulkarni", ward: "Ward 112 (East Zone - PWD)", resolved: 142, coins: 18450, efficiency: 98.4 },
  { rank: 2, name: "Pooja Deshmukh", ward: "Ward 176 (South Water Supply)", resolved: 129, coins: 16900, efficiency: 96.1 },
  { rank: 3, name: "Vikas Narayan", ward: "Ward 94 (Central Solid Waste)", resolved: 114, coins: 14750, efficiency: 94.7 },
  { rank: 4, name: "Suresh Pillai", ward: "Ward 85 (Infra & Electrical)", resolved: 98, coins: 12800, efficiency: 92.3 }
];

const ADDRESS_SUGGESTIONS = [
  "Indiranagar 100ft Road, 4th Cross Corner, Ward 112",
  "BTM Layout 2nd Stage, Outer Ring Road Service Lane",
  "Gandhi Nagar 3rd Main, near Government Primary School",
  "Outer Ring Road Junction 14, Bellandur Flyover Downramp",
  "Koramangala 5th Block, Jyoti Nivas College Road"
];

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('auth'); 
  const [activeSabootIssue, setActiveSabootIssue] = useState(null);
  const [activePramaanIssue, setActivePramaanIssue] = useState(null);
  const [issues, setIssues] = useState(INITIAL_ISSUES);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) handleSessionUser(session.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        handleSessionUser(session.user);
      } else {
        setUser(null);
        setCurrentScreen('auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSessionUser = (authUser) => {
    const userProfile = {
      id: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata?.name || 'Citizen',
      role: authUser.user_metadata?.role || 'citizen',
      alwaysAnonymous: authUser.user_metadata?.always_anonymous || false
    };
    setUser(userProfile);
    setCurrentScreen(userProfile.role === 'officer' ? 'taskboard' : 'feed');
  };

  useEffect(() => {
    async function fetchIssues() {
      const { data, error } = await supabase
        .from('issues')
        .select('*, anumodan_votes(count)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formattedData = data.map(row => ({
          ...row,
          image: row.image_url || row.image, 
          anumodanCount: row.anumodan_votes?.[0]?.count || 0,
          date: new Date(row.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          hasVoted: false, 
          isTracked: false
        }));
        setIssues(formattedData);
      }
    }
    
    if (user) {
      fetchIssues();
    }
  }, [user]);

  const handlePostSubmit = async (newIssueObj, rawFile) => {
    try {
      let publicImageUrl = newIssueObj.image;

      if (rawFile) {
        const fileExt = rawFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('issue-media')
          .upload(filePath, rawFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('issue-media')
          .getPublicUrl(filePath);

        publicImageUrl = urlData.publicUrl;
      }

      const { data: insertedIssue, error: dbError } = await supabase
        .from('issues')
        .insert([
          {
            title: newIssueObj.title,
            description: newIssueObj.description,
            category: newIssueObj.category,
            location: newIssueObj.location,
            severity: newIssueObj.severity,
            image_url: publicImageUrl,
            created_by: user.id,
            status: "Pending"
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      const formattedInsert = {
        ...insertedIssue,
        image: insertedIssue.image_url,
        anumodanCount: 0,
        hasVoted: true,
        isTracked: true,
        date: "Just Now"
      };

      setIssues((prev) => [formattedInsert, ...prev]);
      setCurrentScreen('feed');
    } catch (err) {
      console.error('Failed to permanently store issue:', err);
      alert(`Upload Error: ${err.message}`);
    }
  };

  const handleAnumodanVote = async (id) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        const hasVoted = !issue.hasVoted;
        return {
          ...issue,
          hasVoted,
          anumodanCount: hasVoted ? issue.anumodanCount + 1 : issue.anumodanCount - 1
        };
      }
      return issue;
    }));

    const { error } = await supabase
      .from('anumodan_votes')
      .insert({ issue_id: id, user_id: user.id });
      
    if (error) console.error("Error casting vote:", error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = '[https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400..700;1,400..700&display=swap](https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400..700;1,400..700&display=swap)';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const handleClaimIssue = (id) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          status: 'Claimed',
          claimedBy: user?.id
        };
      }
      return issue;
    }));
  };

  const handleOpenSaboot = (issue) => {
    setActiveSabootIssue(issue);
    setCurrentScreen('saboot');
  };

  const handleOpenPramaan = (issue) => {
    setActivePramaanIssue(issue);
    setCurrentScreen('pramaan');
  };

  return (
    <div className="min-h-screen bg-[#06141B] text-[#CCD0CF] flex antialiased select-none font-['Lora',serif]">
      <style>{`
        .font-bebas {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 400 !important;
        }
        .btn-interact {
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-interact:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          cursor: pointer;
        }
        .btn-interact:active {
          transform: scale(0.96) !important;
        }
        .card-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      {currentScreen === 'auth' || !user ? (
        <ScreenAuth/>
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidebar currentScreen="{currentScreen}" onNavigate="{(screen)" user="{user}"> setCurrentScreen(screen)}
            onLogout={handleLogout}
            onSelectPramaanDefault={() => handleOpenPramaan(issues[0])}
          />

          <div className="flex-1 ml-[260px] flex flex-col min-h-screen bg-[#06141B]">
            <header className="sticky top-0 z-30 bg-[#11212D]/95 backdrop-blur border-b border-[#9BA8AB]/20 px-8 py-3.5 flex items-center justify-between card-shadow">
              <div className="flex items-center gap-3">
                <span className="text-[12px] uppercase text-[#9BA8AB] font-semibold tracking-wider">
                  Active Session:
                </span>
                <span className={`px-3 py-1 rounded text-[12px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${
                  user.role === 'officer'
                    ? 'bg-[#FF9800]/20 text-[#FF9800] border border-[#FF9800]/40'
                    : 'bg-[#6BBF4A]/20 text-[#6BBF4A] border border-[#6BBF4A]/40'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${user.role === 'officer' ? 'bg-[#FF9800]' : 'bg-[#6BBF4A]'}`} />
                  {user.role === 'officer' ? `OFFICER MODE (${user.name})` : `CITIZEN MODE (${user.name})`}
                </span>
              </div>
            </header>

            <main className="flex-1 p-8 max-w-[1440px] w-full mx-auto">
              {currentScreen === 'feed' && (
                <ScreenAwaazFeed issues="{issues}" onAnumodan="{handleAnumodanVote}"/>
              )}

              {currentScreen === 'post' && (
                <ScreenPostAwaaz onCancel="{()" user="{user}"> setCurrentScreen(user.role === 'citizen' ? 'feed' : 'taskboard')}
                  onSubmit={handlePostSubmit}
                />
              )}

              {currentScreen === 'taskboard' && (
                <ScreenOfficerTaskBoard issues="{issues}" onClaim="{handleClaimIssue}" onOpenSaboot="{handleOpenSaboot}" user="{user}"/>
              )}

              {currentScreen === 'saboot' && activeSabootIssue && (
                <ScreenSabootSubmission issue="{activeSabootIssue}" onBack="{()"> setCurrentScreen('taskboard')}
                  onSubmitSuccess={(completedIssue) => {
                    setIssues(prev => prev.map(i => i.id === completedIssue.id ? completedIssue : i));
                    handleOpenPramaan(completedIssue);
                  }}
                />
              )}

              {currentScreen === 'pramaan' && (
                <ScreenAIVerification issue="{activePramaanIssue" issues[0]} onBack="{()" userRole="{user.role}" ||> {
                    if (user.role === 'officer') {
                      setCurrentScreen('taskboard');
                    } else {
                      setCurrentScreen('feed');
                    }
                  }}
                />
              )}

              {currentScreen === 'ledger' && (
                <ScreenPublicLedger officers="{LEADERBOARD_OFFICERS}"/>
              )}

              {currentScreen === 'profile' && (
                <ScreenProfile issues="{issues}" onViewPramaan="{handleOpenPramaan}" user="{user}"/>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ user, currentScreen, onNavigate, onLogout, onSelectPramaanDefault }) {
  const isCitizen = user.role === 'citizen';

  const citizenNav = [
    { id: 'feed', label: 'Awaaz Feed', icon: 'Home' },
    { id: 'post', label: 'Post Awaaz', icon: 'PlusCircle' },
    { id: 'pramaan', label: 'AI Verification', icon: 'ShieldCheck', action: onSelectPramaanDefault },
    { id: 'ledger', label: 'Team Ledger', icon: 'Award' },
    { id: 'profile', label: 'Citizen Profile', icon: 'User' },
  ];

  const officerNav = [
    { id: 'taskboard', label: 'Task Board', icon: 'Home' },
    { id: 'pramaan', label: 'AI Verification', icon: 'ShieldCheck', action: onSelectPramaanDefault },
    { id: 'ledger', label: 'Team Ledger', icon: 'Award' },
    { id: 'profile', label: 'Officer Profile', icon: 'User' },
  ];

  const navItems = isCitizen ? citizenNav : officerNav;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#4A5C6A] flex flex-col justify-between p-5 z-40 border-r border-[#9BA8AB]/20 card-shadow">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-5 border-b border-[#9BA8AB]/20">
          <div className="w-10 h-10 rounded-lg bg-[#11212D] flex items-center justify-center border border-[#9BA8AB]/30 text-[#6BBF4A]">
            <Icon name="Layers" size="{22}"/>
          </div>
          <div>
            <h1 className="font-bebas text-[28px] tracking-wider text-[#CCD0CF] leading-none m-0">
              JANSETU
            </h1>
            <span className="text-[11px] text-[#9BA8AB] tracking-widest uppercase font-sans font-semibold">
              Civic Bridge v2.4
            </span>
          </div>
        </div>

        <div className="mb-6 px-3 py-2 rounded-lg bg-[#253745]/80 border border-[#9BA8AB]/20 flex items-center justify-between">
          <span className="text-[11px] uppercase text-[#9BA8AB] font-semibold">Role View</span>
          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
            isCitizen ? 'bg-[#6BBF4A]/20 text-[#6BBF4A]' : 'bg-[#FF9800]/20 text-[#FF9800]'
          }`}>
            {isCitizen ? 'Citizen' : 'Officer'}
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : onNavigate(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-[14px] font-semibold tracking-wide btn-interact text-left ${
                  isActive
                    ? 'bg-[#11212D] text-[#CCD0CF] shadow-inner border border-[#9BA8AB]/30'
                    : 'text-[#CCD0CF]/85 hover:bg-[#253745] hover:text-[#CCD0CF]'
                }`}
              >
                <Icon "text-[#6BBF4A]" "text-[#9BA8AB]"} "text-[#FF9800]") (isCitizen : ? className="{isActive" name="{item.icon}" size="{20}"/>
                <span className="uppercase text-[13px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#9BA8AB]/20">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-[#253745] border border-[#9BA8AB]/30 flex items-center justify-center text-[#CCD0CF] font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#CCD0CF] truncate leading-tight">
              {user.name}
            </p>
            <p className="text-[11px] text-[#9BA8AB] truncate font-mono">
              {user.email}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#253745] hover:bg-[#F44336]/20 text-[#CCD0CF] hover:text-[#F44336] text-[13px] font-bold uppercase tracking-wider btn-interact border border-[#9BA8AB]/20"
        >
          <Icon name="LogOut" size="{16}"/>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

function ScreenAuth() {
  const [role, setRole] = useState('citizen'); 
  const [mode, setMode] = useState('signin');  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alwaysAnonymous, setAlwaysAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'create') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role, always_anonymous: alwaysAnonymous }
          }
        });
        if (error) throw error;
        alert("Account Created! You are now logged in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-[#06141B]">
      <div className="w-full max-w-[480px] bg-[#11212D] border border-[#9BA8AB]/20 rounded-xl p-8 card-shadow">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#253745] flex items-center justify-center border border-[#9BA8AB]/30 text-[#6BBF4A] mb-3">
            <Icon name="Layers" size="{32}"/>
          </div>
          <h1 className="font-bebas text-[32px] text-[#CCD0CF] leading-tight tracking-wider">
            JANSETU CIVIC PORTAL
          </h1>
          <p className="text-[14px] text-[#9BA8AB] mt-1">
            Citizen Accountability & Municipal Nivaran Framework
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 bg-[#06141B] rounded-lg border border-[#9BA8AB]/20 mb-5">
          <button
            type="button"
            onClick={() => setRole('citizen')}
            className={`py-2 text-[14px] font-semibold uppercase rounded-md btn-interact ${
              role === 'citizen' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Citizen
          </button>
          <button
            type="button"
            onClick={() => setRole('officer')}
            className={`py-2 text-[14px] font-semibold uppercase rounded-md btn-interact ${
              role === 'officer' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Municipal Officer
          </button>
        </div>

        <div className="flex border-b border-[#253745] mb-6">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-center text-[15px] uppercase font-semibold border-b-2 btn-interact ${
              mode === 'signin'
                ? 'border-[#6BBF4A] text-[#CCD0CF]'
                : 'border-transparent text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('create'); setErrorMsg(null); }}
            className={`flex-1 pb-3 text-center text-[15px] uppercase font-semibold border-b-2 btn-interact ${
              mode === 'create'
                ? 'border-[#6BBF4A] text-[#CCD0CF]'
                : 'border-transparent text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-[#F44336]/20 border border-[#F44336] text-[#F44336] text-[13px] text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'create' && (
            <div>
              <label className="block text-[12px] uppercase text-[#9BA8AB] mb-1 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'citizen' ? "e.g. Aarav Sharma" : "e.g. Er. Ramesh Kulkarni"}
                className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-3.5 py-2.5 text-[#CCD0CF] focus:outline-none focus:border-[#6BBF4A] text-[15px]"
              />
            </div>
          )}

          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] mb-1 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-3.5 py-2.5 text-[#CCD0CF] focus:outline-none focus:border-[#6BBF4A] text-[15px]"
            />
          </div>

          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-3.5 py-2.5 text-[#CCD0CF] focus:outline-none focus:border-[#6BBF4A] text-[15px]"
            />
          </div>

          {role === 'citizen' && mode === 'create' && (
            <div className="flex items-center justify-between p-3 bg-[#06141B] border border-[#9BA8AB]/20 rounded-lg mt-2">
              <div>
                <span className="block text-[13px] font-semibold text-[#CCD0CF]">Always Post Anonymously</span>
                <span className="text-[11px] text-[#9BA8AB]">Mask identity on public ward feed</span>
              </div>
              <button
                type="button"
                onClick={() => setAlwaysAnonymous(!alwaysAnonymous)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 ${alwaysAnonymous ? 'bg-[#6BBF4A]' : 'bg-[#253745]'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${alwaysAnonymous ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-[#4A5C6A] hover:bg-[#6BBF4A] hover:text-black text-[#CCD0CF] font-semibold text-[16px] uppercase tracking-wider rounded-lg btn-interact border border-[#9BA8AB]/30 card-shadow disabled:opacity-50"
          >
            {loading ? 'Processing...' : (mode === 'create' ? 'Create Account' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
}

function ScreenAwaazFeed({ issues, onAnumodan }) {
  const [tab, setTab] = useState('trending'); 
  const displayedIssues = tab === 'trending' ? issues : issues.filter(i => i.isTracked);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#253745]">
        <div>
          <h1 className="font-bebas text-[32px] text-[#CCD0CF] tracking-wide m-0">
            AWAAZ CIVIC RADAR
          </h1>
          <p className="text-[14px] text-[#9BA8AB] mt-0.5">
            Democratic community-driven grievances prioritized by verified citizen resonance.
          </p>
        </div>

        <div className="flex bg-[#11212D] border border-[#9BA8AB]/20 rounded-lg p-1">
          <button
            onClick={() => setTab('trending')}
            className={`px-5 py-2 text-[14px] uppercase font-semibold rounded-md btn-interact ${
              tab === 'trending' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Trending Issues ({issues.length})
          </button>
          <button
            onClick={() => setTab('tracked')}
            className={`px-5 py-2 text-[14px] uppercase font-semibold rounded-md btn-interact ${
              tab === 'tracked' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            My Tracked Issues ({issues.filter(i => i.isTracked).length})
          </button>
        </div>
      </div>

      {displayedIssues.length === 0 ? (
        <div className="bg-[#11212D] rounded-xl border border-[#9BA8AB]/15 p-12 text-center my-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#253745] flex items-center justify-center text-[#9BA8AB] mb-3">
            <Icon name="Flame" size="{24}"/>
          </div>
          <h3 className="font-bebas text-[20px] text-[#CCD0CF]">
            {tab === 'tracked' ? "You haven't tracked any issues yet." : "No trending issues recorded."}
          </h3>
          <p className="text-[14px] text-[#9BA8AB] max-w-md mx-auto mt-1">
            {tab === 'tracked'
              ? "Vote or track issues in the Trending feed to monitor their real-time Nivaran and Saboot status."
              : "Check back later or click 'Post Awaaz' to register a new civic defect."}
          </p>
        </div>
      ) : (
        <div className="space-y-6 max-h-[760px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#253745]">
          {displayedIssues.map((issue) => (
            <div key={issue.id} className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl overflow-hidden card-shadow flex flex-col">
              <div className="relative h-72 w-full bg-[#06141B] overflow-hidden">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-[#11212D]/90 backdrop-blur-md border border-[#9BA8AB]/30 text-[#CCD0CF] text-[12px] uppercase font-semibold rounded-md">
                    {issue.category}
                  </span>
                  <span
                    className={`px-3 py-1 backdrop-blur-md text-[12px] uppercase font-semibold rounded-md ${
                      issue.severity === 'Major'
                        ? 'bg-[#F44336]/80 text-white'
                        : issue.severity === 'Moderate'
                        ? 'bg-[#FF9800]/80 text-white'
                        : 'bg-[#4A5C6A]/90 text-[#CCD0CF]'
                    }`}
                  >
                    {issue.severity} Severity
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-[#11212D]/90 backdrop-blur-md px-3 py-1 rounded-md text-[12px] text-[#9BA8AB] border border-[#9BA8AB]/20 font-mono">
                  ID: {issue.id}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bebas text-[20px] text-[#CCD0CF] tracking-wide mb-1 leading-snug">
                      {issue.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#9BA8AB] mb-3">
                      <Icon className="text-[#FF9800]" name="MapPin" size="{14}"/>
                      <span>{issue.location}</span>
                      <span className="mx-1">•</span>
                      <span>{issue.date}</span>
                    </div>
                    <p className="text-[16px] text-[#CCD0CF]/85 line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 self-center pl-4 border-l border-[#253745]">
                    <button
                      onClick={() => onAnumodan(issue.id)}
                      className={`px-4 py-2.5 rounded-lg text-[14px] uppercase font-semibold btn-interact flex items-center gap-2 border ${
                        issue.hasVoted
                          ? 'bg-[#FF9800] text-black border-[#FF9800]'
                          : 'bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] border-[#9BA8AB]/20'
                      }`}
                    >
                      <Icon "text-[#FF9800]"} "text-black : ? className="{issue.hasVoted" fill-black" name="Flame" size="{18}"/>
                      <span>{issue.hasVoted ? 'Anumodit' : '🔥 Anumodan'}</span>
                    </button>

                    <div className="px-3.5 py-2.5 bg-[#06141B] border border-[#9BA8AB]/20 rounded-lg text-center min-w-[54px]">
                      <span className="block font-bebas text-[18px] text-[#FF9800] leading-none">
                        {issue.anumodanCount}
                      </span>
                      <span className="text-[10px] uppercase text-[#9BA8AB] tracking-tighter">
                        Votes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScreenPostAwaaz({ user, onCancel, onSubmit }) {
  const [category, setCategory] = useState('Roads');
  const [description, setDescription] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [rawFile, setRawFile] = useState(null);

  const [showAnonModal, setShowAnonModal] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(user?.alwaysAnonymous || false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setGeoLocation(val);
    if (val.trim().length > 1) {
      const filtered = ADDRESS_SUGGESTIONS.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    setGeoLocation(item);
    setSuggestions([]);
  };

  const handleImagePick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleFormPreSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !geoLocation.trim()) return;
    setShowAnonModal(true);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    
    const newIssueObj = {
      title: `${category} Defect reported at ${geoLocation.split(',')[0]}`,
      description,
      category,
      location: geoLocation,
      severity: "Major"
    };

    await onSubmit(newIssueObj, rawFile);
    
    setLoading(false);
    setShowAnonModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#253745]">
        <div>
          <h1 className="font-bebas text-[32px] text-[#CCD0CF]">
            POST NEW AWAAZ
          </h1>
          <p className="text-[14px] text-[#9BA8AB]">
            File an audited civic grievance into the municipality radar.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-[#9BA8AB] hover:text-[#CCD0CF] text-[14px] uppercase font-semibold px-3 py-1.5 rounded-lg bg-[#253745] btn-interact"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleFormPreSubmit} className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-8 card-shadow space-y-6">
        <div>
          <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
            1. Issue Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-4 py-3 text-[#CCD0CF] text-[15px] focus:outline-none focus:border-[#6BBF4A]"
          >
            <option value="Roads">Roads & Potholes</option>
            <option value="Water">Water Supply & Leakage</option>
            <option value="Sanitation">Sanitation & Drainage</option>
            <option value="Electricity">Electricity & Cables</option>
            <option value="Garbage">Garbage & Solid Waste</option>
            <option value="Streetlight">Streetlight & Public Illumination</option>
          </select>
        </div>

        <div>
          <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
            2. Issue Description
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the defect, hazards caused, duration of issue, and exact landmark..."
            className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg p-3.5 text-[#CCD0CF] text-[15px] focus:outline-none focus:border-[#6BBF4A] resize-none"
          />
        </div>

        <div className="relative">
          <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
            3. Geo Location (Address Search + Autocomplete)
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={geoLocation}
              onChange={handleLocationChange}
              placeholder="Search ward, street name, or landmark..."
              className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-4 py-3 pl-10 text-[#CCD0CF] text-[15px] focus:outline-none focus:border-[#6BBF4A]"
            />
            <div className="absolute left-3.5 top-3.5 text-[#9BA8AB]">
              <Icon name="MapPin" size="{18}"/>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#11212D] border border-[#9BA8AB]/30 rounded-lg shadow-2xl z-20 overflow-hidden">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSuggestion(item)}
                  className="px-4 py-2.5 text-[14px] text-[#CCD0CF] hover:bg-[#253745] cursor-pointer flex items-center gap-2 border-b border-[#253745] last:border-none"
                >
                  <Icon className="text-[#FF9800]" name="MapPin" size="{14}"/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
            4. Proof Photograph
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImagePick}
            className="hidden"
          />

          {previewImage ? (
            <div className="relative rounded-lg overflow-hidden border border-[#9BA8AB]/30 max-h-60 bg-[#06141B]">
              <img src={previewImage} alt="Preview" className="w-full h-60 object-cover" />
              <button
                type="button"
                onClick={() => { setPreviewImage(null); setRawFile(null); }}
                className="absolute top-3 right-3 bg-[#06141B]/80 text-[#CCD0CF] hover:text-[#F44336] p-1.5 rounded-md btn-interact"
              >
                <Icon name="XCircle" size="{20}"/>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-[#253745] hover:border-[#4A5C6A] rounded-lg bg-[#06141B]/60 flex flex-col items-center justify-center text-[#9BA8AB] hover:text-[#CCD0CF] btn-interact"
            >
              <Icon className="text-[#4A5C6A] mb-2" name="UploadCloud" size="{36}"/>
              <span className="text-[14px] font-semibold uppercase">Click to Select Issue Photo</span>
              <span className="text-[12px] text-[#9BA8AB] mt-1">Supports JPG, PNG with camera Exif metadata</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#4A5C6A] hover:bg-[#6BBF4A] hover:text-black text-[#CCD0CF] font-semibold text-[16px] uppercase tracking-wider rounded-lg btn-interact border border-[#9BA8AB]/30 card-shadow"
        >
          Submit Issue For Nivaran
        </button>
      </form>

      {showAnonModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#11212D] border border-[#9BA8AB]/30 rounded-xl p-6 max-w-md w-full card-shadow">
            <h3 className="font-bebas text-[24px] text-[#CCD0CF] mb-2">
              Privacy Preference Check
            </h3>
            <p className="text-[14px] text-[#9BA8AB] mb-6">
              Would you like to post this Awaaz report anonymously on the public ward radar?
            </p>

            <div className="space-y-3 mb-6">
              <label
                onClick={() => setIsAnonymous(true)}
                className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer btn-interact ${
                  isAnonymous ? 'bg-[#253745] border-[#6BBF4A]' : 'bg-[#06141B] border-[#9BA8AB]/20'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isAnonymous ? 'border-[#6BBF4A]' : 'border-[#9BA8AB]'}`}>
                  {isAnonymous && <div className="w-2 h-2 rounded-full bg-[#6BBF4A]" />}
                </div>
                <div>
                  <span className="block text-[14px] font-semibold text-[#CCD0CF]">Yes, Post Anonymously</span>
                  <span className="text-[11px] text-[#9BA8AB]">Your name and identity will remain masked</span>
                </div>
              </label>

              <label
                onClick={() => setIsAnonymous(false)}
                className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer btn-interact ${
                  !isAnonymous ? 'bg-[#253745] border-[#6BBF4A]' : 'bg-[#06141B] border-[#9BA8AB]/20'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!isAnonymous ? 'border-[#6BBF4A]' : 'border-[#9BA8AB]'}`}>
                  {!isAnonymous && <div className="w-2 h-2 rounded-full bg-[#6BBF4A]" />}
                </div>
                <div>
                  <span className="block text-[14px] font-semibold text-[#CCD0CF]">No, Attach My Citizen Profile</span>
                  <span className="text-[11px] text-[#9BA8AB]">Post with official name for civic recognition</span>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowAnonModal(false)}
                className="flex-1 py-2.5 bg-[#253745] text-[#9BA8AB] uppercase font-semibold rounded-lg text-[14px] btn-interact"
              >
                Back
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 bg-[#6BBF4A] text-black uppercase font-bold rounded-lg text-[14px] btn-interact disabled:opacity-50"
              >
                {loading ? 'Uploading...' : 'Confirm & Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenOfficerTaskBoard({ issues, user, onClaim, onOpenSaboot }) {
  const [tab, setTab] = useState('queue');

  const unclaimedIssues = issues.filter(i => i.status === 'Pending');
  const claimedIssues = issues.filter(i => i.status === 'Claimed' || i.status === 'Completed');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#253745]">
        <div>
          <h1 className="font-bebas text-[32px] text-[#CCD0CF]">
            OFFICER TASK BOARD
          </h1>
          <p className="text-[14px] text-[#9BA8AB]">
            Municipal action queue, task claim management, and Saboot proof pipeline.
          </p>
        </div>

        <div className="flex bg-[#11212D] border border-[#9BA8AB]/20 rounded-lg p-1">
          <button
            onClick={() => setTab('queue')}
            className={`px-5 py-2 text-[14px] uppercase font-semibold rounded-md btn-interact ${
              tab === 'queue' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Issues Queue ({unclaimedIssues.length})
          </button>
          <button
            onClick={() => setTab('claimed')}
            className={`px-5 py-2 text-[14px] uppercase font-semibold rounded-md btn-interact ${
              tab === 'claimed' ? 'bg-[#4A5C6A] text-[#CCD0CF] shadow' : 'text-[#9BA8AB] hover:text-[#CCD0CF]'
            }`}
          >
            Claimed Workspace ({claimedIssues.length})
          </button>
        </div>
      </div>

      {tab === 'queue' && (
        <div className="grid grid-cols-2 gap-6">
          {unclaimedIssues.length === 0 ? (
            <div className="col-span-2 bg-[#11212D] rounded-xl border border-[#9BA8AB]/15 p-12 text-center">
              <Icon className="mx-auto text-[#6BBF4A] mb-3" name="CheckCircle2" size="{32}"/>
              <h3 className="font-bebas text-[20px] text-[#CCD0CF]">All Issues Claimed</h3>
              <p className="text-[14px] text-[#9BA8AB]">No pending unassigned civic defects in your jurisdiction.</p>
            </div>
          ) : (
            unclaimedIssues.map((issue) => (
              <div key={issue.id} className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl overflow-hidden card-shadow flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full bg-[#06141B]">
                    <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#11212D]/90 text-[11px] uppercase font-semibold rounded text-[#CCD0CF]">
                      {issue.category}
                    </span>
                    <span className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] uppercase font-semibold rounded ${
                      issue.severity === 'Major' ? 'bg-[#F44336] text-white' : 'bg-[#FF9800] text-black'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bebas text-[20px] text-[#CCD0CF] mb-1 line-clamp-1">
                      {issue.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#9BA8AB] mb-2">
                      <Icon className="text-[#FF9800]" name="MapPin" size="{14}"/>
                      <span className="truncate">{issue.location}</span>
                    </div>
                    <p className="text-[14px] text-[#CCD0CF]/80 line-clamp-2 mb-3">
                      {issue.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#253745] mt-2 pt-4">
                  <div className="flex items-center gap-1.5 text-[#FF9800]">
                    <Icon name="Flame" size="{16}"/>
                    <span className="font-bebas text-[18px]">{issue.anumodanCount}</span>
                    <span className="text-[11px] text-[#9BA8AB] uppercase">Votes</span>
                  </div>

                  <button
                    onClick={() => onClaim(issue.id)}
                    className="px-5 py-2 bg-[#4A5C6A] hover:bg-[#6BBF4A] hover:text-black text-[#CCD0CF] uppercase font-semibold text-[13px] rounded-lg btn-interact border border-[#9BA8AB]/20"
                  >
                    Claim Issue
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'claimed' && (
        <div className="grid grid-cols-2 gap-6">
          {claimedIssues.length === 0 ? (
            <div className="col-span-2 bg-[#11212D] rounded-xl border border-[#9BA8AB]/15 p-12 text-center">
              <h3 className="font-bebas text-[20px] text-[#CCD0CF]">Workspace Empty</h3>
              <p className="text-[14px] text-[#9BA8AB]">Claim an issue from the queue to start work and submit proof.</p>
            </div>
          ) : (
            claimedIssues.map((issue) => (
              <div key={issue.id} onClick={() => onOpenSaboot(issue)} className="bg-[#11212D] border border-[#9BA8AB]/20 rounded-xl overflow-hidden card-shadow p-5 hover:border-[#6BBF4A]/50 cursor-pointer btn-interact">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold bg-[#253745] text-[#9BA8AB] mr-2">
                      {issue.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-semibold ${
                      issue.status === 'Completed' ? 'bg-[#6BBF4A]/20 text-[#6BBF4A]' : 'bg-[#FF9800]/20 text-[#FF9800]'
                    }`}>
                      {issue.status === 'Completed' ? 'Saboot Approved' : 'Action Required'}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#9BA8AB] font-mono">{issue.id}</span>
                </div>

                <h3 className="font-bebas text-[20px] text-[#CCD0CF] mb-1">
                  {issue.title}
                </h3>
                <p className="text-[12px] text-[#9BA8AB] mb-4 flex items-center gap-1">
                  <Icon className="text-[#FF9800]" name="MapPin" size="{14}"/>
                  {issue.location}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#253745]">
                  <span className="text-[13px] text-[#9BA8AB]">
                    Status: <strong className="text-[#CCD0CF]">{issue.status}</strong>
                  </span>
                  <span className="text-[13px] uppercase font-semibold text-[#6BBF4A] flex items-center gap-1">
                    {issue.status === 'Completed' ? 'View Audit Verification →' : 'Submit Saboot Proof →'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ScreenSabootSubmission({ issue, onBack, onSubmitSuccess }) {
  const [beforeImage, setBeforeImage] = useState(issue.image || null);
  const [afterImage, setAfterImage] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [amountSpent, setAmountSpent] = useState('');
  const [description, setDescription] = useState('');

  const autoGeo = issue.location || "12.9716° N, 77.5946° E (Ward 112)";
  const autoTimestamp = "23 Sep 2026, 08:24:10 PM IST (GPS Sync)";

  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);
  const receiptInputRef = useRef(null);

  const isFormValid = beforeImage && afterImage && receiptFile && amountSpent.trim() && description.trim();

  const handleAfterImageChange = (e) => {
    if (e.target.files[0]) {
      setAfterImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleReceiptChange = (e) => {
    if (e.target.files[0]) {
      setReceiptFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const completedIssue = {
      ...issue,
      status: 'Completed',
      verificationData: {
        locationOk: true,
        timestampOk: true,
        reportedCost: Number(amountSpent),
        benchCost: 6500,
        tampering: "None Detected",
        confidence: 96,
        approved: true,
        coins: 450,
        beforeImg: beforeImage,
        afterImg: afterImage
      }
    }
    onSubmitSuccess(completedIssue);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#253745]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] btn-interact"
          >
            <Icon name="ArrowLeft" size="{20}"/>
          </button>
          <div>
            <h1 className="font-bebas text-[32px] text-[#CCD0CF] leading-tight">
              SUBMIT SABOOT (PROOF OF WORK)
            </h1>
            <p className="text-[13px] text-[#9BA8AB]">
              Case {issue.id} — {issue.title}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-8 card-shadow space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
              1. Before Image (Mandatory)
            </label>
            <input
              type="file"
              ref={beforeInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files[0] && setBeforeImage(URL.createObjectURL(e.target.files[0]))}
            />
            {beforeImage ? (
              <div className="relative rounded-lg overflow-hidden border border-[#9BA8AB]/20 h-48 bg-[#06141B]">
                <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => beforeInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#11212D]/90 text-[11px] text-[#CCD0CF] uppercase font-semibold rounded btn-interact"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => beforeInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#253745] rounded-lg bg-[#06141B] flex flex-col items-center justify-center text-[#9BA8AB] btn-interact"
              >
                <Icon className="mb-2 text-[#4A5C6A]" name="UploadCloud" size="{28}"/>
                <span className="text-[13px] uppercase font-semibold">Upload Before Photo</span>
              </button>
            )}
          </div>

          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
              2. After Image (Mandatory)
            </label>
            <input
              type="file"
              ref={afterInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleAfterImageChange}
            />
            {afterImage ? (
              <div className="relative rounded-lg overflow-hidden border border-[#6BBF4A]/40 h-48 bg-[#06141B]">
                <img src={afterImage} alt="After" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#6BBF4A] text-black text-[10px] font-bold uppercase rounded">
                  Resolved Proof
                </span>
                <button
                  type="button"
                  onClick={() => afterInputRef.current?.click()}
                  className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#11212D]/90 text-[11px] text-[#CCD0CF] uppercase font-semibold rounded btn-interact"
                >
                  Change
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => afterInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#6BBF4A]/40 rounded-lg bg-[#06141B] flex flex-col items-center justify-center text-[#9BA8AB] hover:text-[#CCD0CF] btn-interact"
              >
                <Icon className="mb-2 text-[#6BBF4A]" name="UploadCloud" size="{28}"/>
                <span className="text-[13px] uppercase font-semibold text-[#6BBF4A]">Upload After Photo</span>
                <span className="text-[11px] text-[#9BA8AB] mt-1">Must be captured at exact defect site</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-[#253745]">
          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
              3. Cost Report & Receipts (PDF / Image)
            </label>
            <input
              type="file"
              ref={receiptInputRef}
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handleReceiptChange}
            />
            <button
              type="button"
              onClick={() => receiptInputRef.current?.click()}
              className="w-full py-3 px-4 border border-[#9BA8AB]/30 rounded-lg bg-[#06141B] flex items-center justify-between text-[#CCD0CF] btn-interact"
            >
              <span className="text-[14px] truncate">
                {receiptFile ? `📄 ${receiptFile}` : "Select Contractor Invoice / Bill"}
              </span>
              <span className="text-[12px] uppercase font-semibold text-[#6BBF4A]">
                {receiptFile ? 'Uploaded' : 'Browse'}
              </span>
            </button>
          </div>

          <div>
            <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
              4. Amount Spent (INR ₹)
            </label>
            <input
              type="number"
              required
              value={amountSpent}
              onChange={(e) => setAmountSpent(e.target.value)}
              placeholder="e.g. 4800"
              className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg px-4 py-3 text-[#CCD0CF] text-[15px] focus:outline-none focus:border-[#6BBF4A]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[12px] uppercase text-[#9BA8AB] font-semibold mb-2">
            5. Work Description & Materials Used
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details of repair methodology, asphalt grade used, contractor name, and guarantee period..."
            className="w-full bg-[#06141B] border border-[#9BA8AB]/30 rounded-lg p-3.5 text-[#CCD0CF] text-[15px] focus:outline-none focus:border-[#6BBF4A] resize-none"
          />
        </div>

        <div className="p-4 rounded-lg bg-[#06141B] border border-[#9BA8AB]/20 grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-[#9BA8AB] font-semibold mb-1">
              🔒 Auto-Captured Geo Tag (Tamper-Resistant)
            </span>
            <div className="flex items-center gap-2 text-[13px] text-[#CCD0CF] font-mono">
              <Icon className="text-[#FF9800]" name="MapPin" size="{16}"/>
              <span>{autoGeo}</span>
            </div>
          </div>
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-[#9BA8AB] font-semibold mb-1">
              ⏰ Hardware System NTP Timestamp
            </span>
            <div className="flex items-center gap-2 text-[13px] text-[#CCD0CF] font-mono">
              <Icon className="text-[#6BBF4A]" name="Clock" size="{16}"/>
              <span>{autoTimestamp}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-lg font-semibold text-[16px] uppercase tracking-wider btn-interact card-shadow border ${
            isFormValid
              ? 'bg-[#4A5C6A] hover:bg-[#6BBF4A] hover:text-black text-[#CCD0CF] border-[#9BA8AB]/30'
              : 'bg-[#253745]/50 text-[#9BA8AB]/50 border-transparent cursor-not-allowed'
          }`}
        >
          Submit Saboot for Pramaan AI Verification
        </button>
      </form>
    </div>
  );
}

function ScreenAIVerification({ issue, userRole, onBack }) {
  const [step, setStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [aiError, setAiError] = useState(null);
  
  const [verification, setVerification] = useState({
    locationOk: true,
    timestampOk: true,
    reportedCost: issue.verificationData?.reportedCost || 4800,
    benchCost: 6500,
    tampering: "Analyzing...",
    confidence: 0,
    approved: false,
    coins: 450,
    beforeImg: issue.verificationData?.beforeImg || issue.image,
    afterImg: issue.verificationData?.afterImg || "[https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80](https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80)"
  });

  const fetchImageAsBase64 = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Failed to load image for AI:", e);
      return null;
    }
  };

  useEffect(() => {
    async function runAIAudit() {
      try {
        setStep(1); 
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        if (!apiKey) {
          throw new Error("Missing VITE_GEMINI_API_KEY in .env file");
        }

        const beforeBase64 = await fetchImageAsBase64(verification.beforeImg);
        const afterBase64 = await fetchImageAsBase64(verification.afterImg);

        setStep(3); 

        const prompt = `
          You are Pramaan, an autonomous civic AI auditor. 
          I am providing two images: Image 1 (Before) and Image 2 (After).
          The officer claims to have fixed a civic defect (Category: ${issue.category}) at a cost of ₹${verification.reportedCost}.
          
          Analyze the images and determine:
          1. Did the core issue actually get fixed? 
          2. Do the surroundings match (proving it's the same location)?
          3. Are there signs of Photoshop/tampering in the After image?
          
          Respond ONLY with a valid JSON object matching this exact structure (no markdown tags, no extra text):
          {
            "tampering": "Brief 3-4 word description (e.g., 'None Detected' or 'Lighting Anomaly')",
            "confidence": <number between 1 and 100>,
            "approved": <boolean>
          }
        `;

        const response = await fetch(`[https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$](https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$){apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: "image/jpeg", data: beforeBase64 } },
                { inline_data: { mime_type: "image/jpeg", data: afterBase64 } }
              ]
            }]
          })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const aiTextResponse = data.candidates[0].content.parts[0].text;
        const cleanJsonString = aiTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiVerdict = JSON.parse(cleanJsonString);

        setStep(5); 

        setTimeout(() => {
          setVerification(prev => ({
            ...prev,
            tampering: aiVerdict.tampering,
            confidence: aiVerdict.confidence,
            approved: aiVerdict.confidence > 75 ? true : false,
          }));
          setStep(6); 
          setIsAnalyzing(false);
        }, 1500);

      } catch (error) {
        console.error("AI Error:", error);
        setAiError(error.message);
        setIsAnalyzing(false);
      }
    }

    runAIAudit();
  }, [issue.id]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#253745]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg bg-[#253745] hover:bg-[#4A5C6A] text-[#CCD0CF] btn-interact">
            <Icon name="ArrowLeft" size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bebas text-[32px] text-[#CCD0CF]">PRAMAAN AI VERIFICATION</h1>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${isAnalyzing ? 'bg-[#FF9800]/20 text-[#FF9800] animate-pulse' : 'bg-[#6BBF4A]/20 text-[#6BBF4A]'}`}>
                {isAnalyzing ? 'Processing Live Audit...' : 'Autonomous Complete'}
              </span>
            </div>
            <p className="text-[13px] text-[#9BA8AB]">Multi-modal zero-trust audit inspecting spatial metadata, cost variance & tamper detection via Gemini 1.5.</p>
          </div>
        </div>
      </div>

      {aiError ? (
        <div className="p-6 bg-[#F44336]/10 border border-[#F44336] rounded-xl text-[#F44336]">
          <h3 className="font-bebas text-[24px]">AI Connection Failed</h3>
          <p className="text-[14px] mt-2 font-mono">{aiError}</p>
          <p className="text-[14px] mt-4">Did you remember to add your VITE_GEMINI_API_KEY to the .env file and restart the server?</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-5 rounded-xl border transition-all duration-500 flex items-center justify-between ${step >= 1 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#6BBF4A]/20 text-[#6BBF4A] flex items-center justify-center">
                <Icon name="CheckCircle2" size={22} />
              </div>
              <div>
                <h4 className="font-bebas text-[18px] text-[#CCD0CF]">1. Geo-Spatial Coordinates Verified</h4>
                <p className="text-[12px] text-[#9BA8AB]">Cellular tower triangulation and GPS metadata align within 8.2 meters of reported hazard.</p>
              </div>
            </div>
            <span className="font-bebas text-[18px] text-[#6BBF4A]">✓ Match (PASS)</span>
          </div>

          <div className={`p-5 rounded-xl border transition-all duration-500 ${step >= 3 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6BBF4A]/20 text-[#6BBF4A] flex items-center justify-center">
                  <Icon name="CheckCircle2" size={22} />
                </div>
                <div>
                  <h4 className="font-bebas text-[18px] text-[#CCD0CF]">2. Cost Reasonableness & Audit Benchmark</h4>
                  <p className="text-[12px] text-[#9BA8AB]">Officer claimed cost evaluated against PWD schedule of rates (SoR).</p>
                </div>
              </div>
            </div>
            <div className="bg-[#06141B] p-4 rounded-lg border border-[#9BA8AB]/15 space-y-3">
              <div>
                <div className="flex justify-between text-[12px] mb-1 font-semibold">
                  <span className="text-[#CCD0CF]">Officer Reported Cost</span>
                  <span className="text-[#6BBF4A]">₹{verification.reportedCost}</span>
                </div>
                <div className="h-4 bg-[#253745] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6BBF4A] rounded-full" style={{ width: `${Math.min(100, (verification.reportedCost / 8000) * 100)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className={`p-5 rounded-xl border transition-all duration-500 flex items-center justify-between ${step >= 5 ? 'bg-[#11212D] border-[#9BA8AB]/20 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 6 ? (verification.approved ? 'bg-[#6BBF4A]/20 text-[#6BBF4A]' : 'bg-[#F44336]/20 text-[#F44336]') : 'bg-[#FF9800]/20 text-[#FF9800] animate-spin'}`}>
                <Icon name={step >= 6 ? (verification.approved ? "CheckCircle2" : "XCircle") : "RefreshCw"} size={22} />
              </div>
              <div>
                <h4 className="font-bebas text-[18px] text-[#CCD0CF]">3. Neural Image Tampering & Visual Proof</h4>
                <p className="text-[12px] text-[#9BA8AB]">Gemini Vision analyzing ELA, GAN artifacts, and before/after topological match.</p>
              </div>
            </div>
            <span className={`font-bebas text-[18px] ${step >= 6 ? (verification.approved ? 'text-[#6BBF4A]' : 'text-[#F44336]') : 'text-[#FF9800]'}`}>
              {step >= 6 ? `Verdict: ${verification.tampering}` : 'Analyzing Photos...'}
            </span>
          </div>

          <div className={`p-6 rounded-xl border transition-all duration-700 ${step >= 6 ? 'bg-[#11212D] border-[#9BA8AB]/30 opacity-100 translate-y-0 card-shadow' : 'bg-[#11212D]/20 border-transparent opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bebas text-[24px] text-[#CCD0CF] mb-1">4. Live Pramaan Confidence Score</h4>
                <p className="text-[13px] text-[#9BA8AB] max-w-md">Synthesized strictly by Google Gemini based on multimodal visual analysis.</p>
              </div>

              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#253745" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="50" cy="50" r="40" stroke={verification.confidence > 75 ? "#6BBF4A" : "#F44336"} strokeWidth="8"
                    strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * verification.confidence) / 100}
                    strokeLinecap="round" fill="transparent" className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-bebas text-[28px] text-[#CCD0CF] leading-none">{verification.confidence}%</span>
                  <span className="text-[9px] uppercase text-[#9BA8AB] font-bold">Confidence</span>
                </div>
              </div>
            </div>

            {step >= 6 && (
              <div className="mt-6 pt-6 border-t border-[#253745]">
                {verification.approved ? (
                  <div className="p-4 rounded-xl bg-[#6BBF4A]/15 border border-[#6BBF4A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6BBF4A] text-black flex items-center justify-center font-bold">✓</div>
                      <div>
                        <h3 className="font-bebas text-[22px] text-[#6BBF4A] leading-tight m-0">✅ Approved by Pramaan Protocol</h3>
                        <p className="text-[12px] text-[#CCD0CF]">Visuals validated. Resolution verified and logged on team ledger.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#F44336]/15 border border-[#F44336] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F44336] text-white flex items-center justify-center font-bold">!</div>
                      <div>
                        <h3 className="font-bebas text-[22px] text-[#F44336] leading-tight m-0">⚠️ Flagged for Fraud / Mismatch</h3>
                        <p className="text-[12px] text-[#CCD0CF]">AI determined the proof images do not match the defect. Escrowed for review.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenPublicLedger({ officers }) {
  const sortedOfficers = [...officers].sort((a, b) => b.coins - a.coins);

  return (
    <div className="w-full">
      <div className="mb-8 pb-4 border-b border-[#253745]">
        <h1 className="font-bebas text-[32px] text-[#CCD0CF]">
          PUBLIC TEAM LEDGER & LEADERBOARD
        </h1>
        <p className="text-[14px] text-[#9BA8AB]">
          Transparent, tamper-proof municipal performance ranking driven by verified Nivaran resolution outcomes.
        </p>
      </div>

      <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl overflow-hidden card-shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#253745] bg-[#06141B]/50">
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider w-20">Rank</th>
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider">Officer Name</th>
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider">Ward / Department</th>
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider text-center">Issues Resolved</th>
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider text-right">Total Seva Coins</th>
              <th className="py-4 px-6 font-bebas text-[18px] text-[#9BA8AB] tracking-wider text-right">Spend-Efficiency %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#253745]/60 text-[15px]">
            {sortedOfficers.map((off) => (
              <tr key={off.rank} className="hover:bg-[#253745]/30 transition-colors btn-interact">
                <td className="py-4 px-6">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bebas text-[18px] ${
                    off.rank === 1 ? 'bg-[#FF9800] text-black font-bold' : off.rank === 2 ? 'bg-[#CCD0CF] text-black font-bold' : off.rank === 3 ? 'bg-[#4A5C6A] text-white' : 'bg-[#253745] text-[#9BA8AB]'
                  }`}>
                    {off.rank}
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-[#CCD0CF]">
                  {off.name}
                </td>
                <td className="py-4 px-6 text-[#9BA8AB] text-[14px]">
                  {off.ward}
                </td>
                <td className="py-4 px-6 text-center font-bebas text-[20px] text-[#CCD0CF]">
                  {off.resolved}
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="font-bebas text-[22px] text-[#6BBF4A] flex items-center justify-end gap-1.5">
                    <Icon name="Coins" size={18} />
                    {off.coins.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-6 text-right font-semibold text-[#CCD0CF]">
                  <span className="px-2.5 py-1 rounded bg-[#253745] text-[#6BBF4A] border border-[#9BA8AB]/20 text-[13px]">
                    {off.efficiency}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScreenProfile({ user, issues, onViewPramaan }) {
  const isOfficer = user.role === 'officer';

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-[#11212D] border border-[#9BA8AB]/20 rounded-xl p-6 card-shadow mb-8 flex items-center gap-6">
        <div className={`w-20 h-20 rounded-xl bg-[#253745] border-2 border-[#9BA8AB]/30 flex items-center justify-center font-bebas text-[36px] ${
          isOfficer ? 'text-[#FF9800]' : 'text-[#6BBF4A]'
        }`}>
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-bebas text-[32px] text-[#CCD0CF] leading-tight m-0">
              {user.name}
            </h1>
            <span className={`px-2.5 py-0.5 rounded text-[11px] uppercase font-bold tracking-wider ${
              isOfficer ? 'bg-[#FF9800]/20 text-[#FF9800]' : 'bg-[#6BBF4A]/20 text-[#6BBF4A]'
            }`}>
              {isOfficer ? 'Municipal Nodal Engineer' : 'Verified Citizen'}
            </span>
          </div>
          <p className="text-[13px] text-[#9BA8AB] mt-1 font-mono">
            Contact Registered: {user.email}
          </p>
        </div>
      </div>

      {isOfficer ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-5 card-shadow">
              <span className="text-[12px] uppercase text-[#9BA8AB] block mb-1 font-semibold">Total Seva Coins</span>
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={24} className="text-[#6BBF4A]" />
                <span className="font-bebas text-[32px] text-[#6BBF4A] leading-none">18,450</span>
              </div>
            </div>

            <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-5 card-shadow">
              <span className="text-[12px] uppercase text-[#9BA8AB] block mb-1 font-semibold">Resolution Rate</span>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={24} className="text-[#6BBF4A]" />
                <span className="font-bebas text-[32px] text-[#CCD0CF] leading-none">98.4%</span>
              </div>
            </div>

            <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-5 card-shadow">
              <span className="text-[12px] uppercase text-[#9BA8AB] block mb-1 font-semibold">Issues Resolved</span>
              <div className="flex items-center gap-2">
                <Icon name="Flame" size={24} className="text-[#FF9800]" />
                <span className="font-bebas text-[32px] text-[#CCD0CF] leading-none">142 Tickets</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-6 card-shadow">
              <h3 className="font-bebas text-[20px] text-[#CCD0CF] mb-4">
                Seva Coin Accumulation Trend
              </h3>
              <div className="h-44 flex items-end gap-3 pt-6 border-b border-[#253745]">
                {[20, 35, 45, 60, 75, 88, 100].map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-[#4A5C6A] hover:bg-[#6BBF4A] rounded-t transition-all duration-300"
                      style={{ height: `${val * 1.3}px` }}
                    />
                    <span className="text-[10px] text-[#9BA8AB]">Wk {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-6 card-shadow">
              <h3 className="font-bebas text-[20px] text-[#CCD0CF] mb-4">
                Category-Wise Resolutions
              </h3>
              <div className="space-y-3">
                {[
                  { cat: "Roads & Asphalt", count: 68, pct: 75, color: "bg-[#6BBF4A]" },
                  { cat: "Water & Pipelines", count: 42, pct: 55, color: "bg-[#4A5C6A]" },
                  { cat: "Streetlights", count: 22, pct: 35, color: "bg-[#FF9800]" },
                  { cat: "Drainage / Sanitation", count: 10, pct: 20, color: "bg-[#253745]" }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[12px] mb-1">
                      <span className="text-[#CCD0CF] font-semibold">{item.cat}</span>
                      <span className="text-[#9BA8AB]">{item.count} closed</span>
                    </div>
                    <div className="h-2.5 bg-[#06141B] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#11212D] border border-[#9BA8AB]/15 rounded-xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#253745]">
            <h3 className="font-bebas text-[20px] text-[#CCD0CF]">
              My Grievance Tracking History
            </h3>
            <span className="text-[12px] text-[#9BA8AB]">
              Click any verifiable issue to open AI audit certificate
            </span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#253745] text-[#9BA8AB] text-[12px] uppercase">
                <th className="py-3 px-4 font-bebas text-[16px]">Issue Title</th>
                <th className="py-3 px-4 font-bebas text-[16px]">Category</th>
                <th className="py-3 px-4 font-bebas text-[16px]">Status</th>
                <th className="py-3 px-4 font-bebas text-[16px] text-right">Anumodan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#253745]/60 text-[14px]">
              {issues.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onViewPramaan(item)}
                  className="hover:bg-[#253745]/40 transition-colors cursor-pointer btn-interact"
                >
                  <td className="py-3.5 px-4 font-semibold text-[#CCD0CF]">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-[#9BA8AB]">
                    {item.category}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] uppercase font-bold ${
                      item.status === 'Completed'
                        ? 'bg-[#6BBF4A]/20 text-[#6BBF4A]'
                        : item.status === 'Claimed'
                        ? 'bg-[#FF9800]/20 text-[#FF9800]'
                        : 'bg-[#253745] text-[#9BA8AB]'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bebas text-[18px] text-[#FF9800]">
                    {item.anumodanCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
