#!/bin/bash

kubectl create namespace X

kubectl create -f 001-local-volumes.yaml

kubectl create -f 002-mysql-credentials.yaml

kubectl create -f 003-mysql/001-mysql-volume.yaml
kubectl create -f 003-mysql/002-mysql-deployment.yaml
kubectl create -f 003-mysql/003-mysql-service.yaml

kubectl create -f 004-wordpress/001-wordpress-volume.yaml
kubectl create -f 004-wordpress/002-wordpress-deployment.yaml
kubectl create -f 004-wordpress/003-wordpress-service.yaml

kubectl apply --record -f podinfo-hpa.yaml

