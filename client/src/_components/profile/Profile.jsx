import { useRecoilState, useRecoilValue } from 'recoil';
import { useProfileAction } from '_actions';
import { profileAtom } from '_state';
import {ProfileForm} from '_components/profile'
export { Profile };
function Profile() {
    const [profile,setProfile] = useRecoilState(profileAtom);
    return (
        <ProfileForm data = {profile} isTable = {false}/>
    );
}