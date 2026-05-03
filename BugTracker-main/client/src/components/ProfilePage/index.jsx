import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="ml-72 pt-24 pb-16 pr-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-gray-950 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 animate-slide-down">
          <h1 className="text-5xl font-bold bg-gradient-orange bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            Your account details
          </p>
          <div className="h-1 w-16 bg-gradient-orange rounded-full mt-4"></div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 space-y-4">
          <ProfileRow label="Name" value={currentUser?.name} />
          <ProfileRow label="Nickname" value={currentUser?.nickname} />
          <ProfileRow label="Email" value={currentUser?.email} />
          <ProfileRow label="Role" value={currentUser?.role} />
        </div>
      </div>
    </div>
  );
};

const ProfileRow = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
      {label}
    </p>
    <p className="text-base font-medium text-gray-900 dark:text-white">{value || "-"}</p>
  </div>
);

export default ProfilePage;
