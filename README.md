docker run --env-file=./.env -p=5001:5001 -v "$HOME/.aws/:/root/.aws/" -v "$PWD/.env:/usr/src/app/.env" -v "$PWD/src:/usr/src/app/src" -v "$PWD/.babelrc:/usr/src/app/.babelrc" -v "$PWD/.eslintrc.js:/usr/src/app/.eslintrc.js" -v "$PWD/Makefile:/usr/src/app/Makefile" -v "$PWD/package.json:/usr/src/app/package.json" -it lambda-starter-kit:1.0.0 /bin/bash
