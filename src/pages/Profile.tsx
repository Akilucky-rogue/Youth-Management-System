
import ProfileForm from "@/components/ProfileForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout title="Edit Your Profile">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
