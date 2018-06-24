#!/bin/bash




kubectl delete deployment mysql --namespace X
kubectl delete service mysql --namespace X

kubectl delete deployment wordpress --namespace X
kubectl delete service wordpress --namespace X

kubectl delete secret mysql-credentials --namespace X

kubectl delete pvc wordpress-volume --namespace X
kubectl delete pvc mysql-volume --namespace X

kubectl delete pv local-volume-0001
kubectl delete pv local-volume-0002

kubectl delete namespace sth
