pipeline {
  /* 1. Używamy agenta dockerContainer bez args */
  agent {
    dockerContainer {
      image 'node:18'
      // args '-u root:root'   ← usunięte, bo nieobsługiwane
    }
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        dir('node-app') {
          sh 'npm install'
        }
      }
    }

    stage('Lint & Test') {
      steps {
        dir('node-app') {
          sh 'npm run lint || true'
          sh 'npm test'
        }
      }
    }

    stage('Build') {
      steps {
        dir('node-app') {
          sh 'npm run build || echo "Brak skryptu build"'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline zakończony sukcesem.'
    }
    failure {
      echo '❌ Pipeline zakończony porażką.'
    }
  }
}
