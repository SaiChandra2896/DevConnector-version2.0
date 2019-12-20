import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilebyId } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience'
import { Link } from 'react-router-dom';

const Profile = ({ getProfilebyId, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getProfilebyId(match.params.id);
    }, [getProfilebyId, match.params.id]);
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : (<div>
                <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-dark"> Edit Profile
                </Link>)}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (<div>
                            {profile.experience.map(exp => (
                                <ProfileExperience key={exp._id} experience={exp} />
                            ))}
                        </div>) : (<h4>No experience updated..</h4>)}
                    </div>
                </div>
            </div>)}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfilebyId: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfilebyId })(Profile);