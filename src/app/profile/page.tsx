import withAuth from '@/lib/auth/withAuth';
import { ProfileContainer } from '../container/profile_view';

function ProfilePage() {
  return <ProfileContainer />;
}

export default withAuth(ProfilePage);
