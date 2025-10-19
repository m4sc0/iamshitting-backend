pipeline {
    agent { label 'dev && docker' }
    options { disableConcurrentBuilds() }
    triggers { githubPush() }
    environment {
        IMAGE = 'iamshitting/backend:dev'
        CONTAINER = 'iamshitting-backend-dev'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_SHA     = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_MSG     = sh(script: 'git log -1 --pretty=%s', returnStdout: true).trim()
                    env.GIT_AUTHOR  = sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()
                }
            }
        }
        stage('Build Image') {
            steps { sh 'docker build -t $IMAGE .' }
        }
        stage('Deploy') {
            steps {
                sh """
                    docker rm -f $CONTAINER || true

                    set -a
                    . /srv/db/dev.env
                    set +a
                    DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}"

                    docker run -d \
                        --name $CONTAINER \
                        --restart unless-stopped \
                        --network proxy \
                        --network iamshitting-dev \
                        --env-file /srv/db/dev.env \
                        -e NODE_ENV=development \
                        -e DEVELOPMENT=true \
                        -e BUILD="$BUILD_NUMBER" \
                        -e DB_URL="$DATABASE_URL" \
                        $IMAGE
                """
            }
        }
    }
    post {
        always {
            sh 'docker ps --filter "name=$CONTAINER" || true'
            script {
                if (env.DISCORD_WEBHOOK?.trim()) {
                    def now = new Date().format("yyyy-MM-dd HH:mm:ss 'UTC'", TimeZone.getTimeZone('UTC'))
                    def title = "${env.JOB_NAME} #${env.BUILD_NUMBER}"
                    def desc = """**Result:** ${currentBuild.currentResult}
            **Changes:** ${env.GIT_SHA} | ${env.GIT_MSG}
            **Author:** ${env.GIT_AUTHOR}
            **Branch:** ${env.GIT_BRANCH}
            """
                    discordSend(
            description: desc,
            footer: "Finished at ${now}",
            link: env.BUILD_URL,
            result: currentBuild.currentResult,
            title: title,
            webhookURL: env.DISCORD_WEBHOOK
          )
        } else {
                    echo 'DISCORD_WEBHOOK not set. Skipping Discord notification.'
                }
            }
        }
    }
}
