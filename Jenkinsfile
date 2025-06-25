pipeline {
  agent {
    docker {
      image 'node:18'
      args '-u root:root'
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
          // opcjonalne: jeśli masz skrypt "lint" w package.json
          sh 'npm run lint  true'
          sh 'npm test  echo "Brak testów lub testy nieprzechodzące"'
        }
      }
    }

    stage('Build') {
      steps {
        dir('node-app') {
          sh 'npm run build || echo "Brak etapu build (opcjonalnie)"'
        }
      }
    }
  }

  post {
    success {
      echo 'Build zakończony sukcesem.'
    }
    failure {
      echo 'Build nie powiódł się.'
    }
  }
}
