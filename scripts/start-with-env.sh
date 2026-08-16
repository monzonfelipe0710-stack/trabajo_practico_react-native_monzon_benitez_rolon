#!/usr/bin/env bash
# Carga variables desde .env si existe y arranca Expo
set -e
# Activar export automático, cargar .env y desactivar
if [ -f .env ]; then
  set -o allexport
  # shellcheck disable=SC1091
  . .env
  set +o allexport
fi
exec npx expo start "$@"
