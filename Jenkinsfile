pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Bar-Kas/node-projekt-narzedzia.git', credentialsId: 'github-token'
      }
    }

    stage('Build & Test') {
      agent {
        docker {
          image 'node:18'
          args  '-u root:root'
        }
      }
      steps {
        sh 'cd node-app && npm install'
        sh 'cd node-app && npm test'
      }
    }

    stage('Build Docker Image') {
      agent {
        // Użyj obrazu z klientem docker-cli
        docker {
          image 'docker:24-dind'   // lub 'docker:latest'
          args  '-v /var/run/docker.sock:/var/run/docker.sock'
        }
      }
      steps {
        sh 'docker build -t node-app:latest node-app'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline zakończony powodzeniem!'
    }
    failure {
      echo '❌ Pipeline zakończony porażką.'
    }
  }
}
