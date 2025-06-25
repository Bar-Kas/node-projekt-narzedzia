pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build & Test in Node.js container') {
      steps {
        script {
          // Pobieramy obraz node:18 i wykonujemy w nim komendy
          docker.image('node:18').inside {
            dir('node-app') {
              sh 'npm install'
              sh 'npm run lint || true'
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        // Ten krok użyje hostowego Dockera (małe „docker build” w twoim katalogu)
        sh 'docker build -t node-app:latest node-app'
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
