pipeline{
    agent any

    stages{
       stage('Check Tools'){
        steps{
            sh 'node -v'
            sh 'npm -v'
        }
    stage('Install'){
        steps{
            sh 'npm ci'
        }
    }
    stage('Test'){
        steps{
            sh 'npm test'
        }
    }
    stage('Build'){
        steps{
            sh 'npm run build'
        }
    }
    stage('Deploy'){
        steps {
            sh 'rm -rf /var/www/edupulse/*'
            sh 'cp -r dist/* /var/www/edupulse/'
        }
    }
    }
    post {
    success { echo 'SUCCESS': your site is live on the server. }
    failure { echo 'FAILED': scroll up in this log to find the red error.' }
 }
}
}
