import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed in', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat Web App</h2>
                <p>Progressive chat platform for Students</p>
              </div>

              <div className="mt-3">


                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
                {/* <Button block color="blue" onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button> */}
                <br></br>
                <br></br>
                <br></br>
                <center>
                  <h4>Created With ❤️ By SAHIL BHARAL</h4>
                  <br></br>
                  <p>for any query contact :  </p>
                  <p> SAHIL BHARAL  </p>
                  <p> +91 7056099684 </p>
                  <br></br>
                  <br></br>
                  <h6>Read:</h6>
                  <p>chat in this app are public.</p>
                  <p>Anyone who use this app can read all messages.</p>


                </center>

              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>


  );
};

export default SignIn;
