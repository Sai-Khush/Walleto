pipeline {
    agent any

    tools {
        nodejs "Node18"
    }

    environment {
        NODE_ENV = "development"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sai-Khush/Walleto.git',
                    credentialsId: 'github-https-pat'
            }
        }

        stage('Clean Workspace') {
            steps {
                echo "🧹 Cleaning old workspace..."
                dir('Code/walleto') {
                    sh 'rm -rf node_modules package-lock.json .next'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing all dependencies..."
                dir('Code/walleto') {
                    sh '''
                        npm cache clean --force
                        npm install --include=dev
                        npm list typescript || echo "⚠️ TypeScript not found but continuing..."
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                echo "🏗️ Building Next.js project..."
                dir('Code/walleto') {
                    sh '''
                        npm install -g typescript
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy to DEV') {
            steps {
                echo "🚀 Deploying Walleto to DEV environment..."
                dir('Code/walleto') {
                    sh '''
                        # Stop any running Node process on port 3000
                        pkill -f "next start" || true

                        # Start Next.js server in background
                        nohup npm run start > app.log 2>&1 &
                        echo "✅ Walleto running in background on port 3000"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Jenkins pipeline executed successfully!"
        }
        failure {
            echo "❌ Deployment failed. Please check the above logs."
        }
    }
}
