pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/Bar-Kas/node-projekt-narzedzia.git', branch: 'master'
      }
    }

    stage('Build and Test') {
      steps {
        sh 'cd node-app && npm install'
        sh 'cd node-app && npm test'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t node-app:latest node-app'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'node-app/**/*.log', allowEmptyArchive: true
    }
  }
}

