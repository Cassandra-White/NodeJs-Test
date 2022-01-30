// require('dotenv').config()

const sgMail = require('@sendgrid/mail');
const sendgridKeyAPI = process.env.SINDGRID_KEY_API

sgMail.setApiKey(sendgridKeyAPI);


const sendEmailWelcome = (userEmail, userName) => {

    const msg = {
        to: userEmail, // Change to your recipient
        from: 'task.manager.git@gmail.com', // Change to your verified sender
        subject: `Bienvenue ${userName} sur l\'API Task-Manager !`,
        text: `Bienvenue ${userName},  vous pourrez retrouver d\'autres projets sur mon Git : https://github.com/Cassandra-White`,
        // html: '<a href="https://github.com/Cassandra-White" >Cassandra-White</a>',
      }

      sgMail
      .send(msg)
      // .then(() => {
      //   console.log('Email sent')
      // })
      // .catch((error) => {
      //   console.error(error)
      // })


}

const sendEmailCancelation = (userEmail, userName) => {
    const msg = {
        to: userEmail, // Change to your recipient
        from: 'task.manager.git@gmail.com', // Change to your verified sender
        subject: `Merci ${userName} !`,
        text: `Merci ${userName} d\'avoir testé l\'API, vous pourrez retrouver d\'autres projets sur mon Git : https://github.com/Cassandra-White`,
        // html: '<a href="https://github.com/Cassandra-White" >Cassandra-White</a>',
      }

      sgMail
      .send(msg)
      // .then(() => {
      //   console.log('Email sent')
      // })
      // .catch((error) => {
      //   console.error(error)
      // })
}


const sendEmailPasswordChange = (userEmail, userName) => {
    const msg = {
        to: userEmail, // Change to your recipient
        from: 'task.manager.git@gmail.com', // Change to your verified sender
        subject: `${userName} Changement de mot de passe !`,
        text: `Bonjour ${userName},Votre demande de changement de mot de passe à bien été effectué`,
        // html: '<a href="https://github.com/Cassandra-White" >Cassandra-White</a>',
      }

      sgMail
      .send(msg)
      // .then(() => {
      //   console.log('Email sent')
      // })
      // .catch((error) => {
      //   console.error(error)
      // })
}

// const msg = {
//     to: 'task.manager.git@gmail.com', // Change to your recipient
//     from: 'task.manager.git@gmail.com', // Change to your verified sender
//     subject: 'Ceci est un test',
//     text: 'Si tu lis ceci c est que tu as réussi',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }

//   sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

module.exports ={
    sendEmailWelcome,
    sendEmailCancelation,
    sendEmailPasswordChange,
}