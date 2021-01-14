Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'node:10.17' }
    stages {
        stage('build') {
            steps {
                sh '''
                  node -v
                  npm --version
                '''
            }
        }
    }
    post {
      success {
        echo "success"
      }
    }
}