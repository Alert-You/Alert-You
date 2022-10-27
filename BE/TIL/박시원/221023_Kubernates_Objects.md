# 00_Kubernates_Objects

쿠버네티스 오브젝트들

## 1. Pod (파드)

> 쿠버네티스에서 관리하는 가장 작은 배포 단위, 쿠버네티스와 상호작용하는 가장 작은 단위

### kubectl run (Pod 생성하기)

```
 kubectl run [이름] --image [이미지 주소]
```

- 예시

```bash
kubectl run echo --image ghcr.io/subicura/echo:v1
```

![image](https://user-images.githubusercontent.com/93081720/197321703-4ef7f541-8094-4e24-a3d2-2f9f3ca12283.png)

- 생성 과정

![image](https://user-images.githubusercontent.com/93081720/197321783-6b74cf27-b794-418a-a7e6-20c98067f726.png)

1. `Scheduler`는 API서버를 감시하면서 할당되지 않은unassigned `Pod`이 있는지 체크
2. `Scheduler`는 할당되지 않은 `Pod`을 감지하고 적절한 `노드`node에 할당 (minikube는 단일 노드)
3. 노드에 설치된 `kubelet`은 자신의 노드에 할당된 `Pod`이 있는지 체크
4. `kubelet`은 `Scheduler`에 의해 자신에게 할당된 `Pod`의 정보를 확인하고 컨테이너 생성
5. `kubelet`은 자신에게 할당된 `Pod`의 상태를 `API 서버`에 전달

### kubectl apply

- yml 파일 작성

```yml
# echo-pod.yml
apiVerison: v1
kind: Pod
metadata:
  name: echo
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
```

- pod 생성(yml이 존재하는 폴더에서 실행)

```bash
kubectl apply -f echo-pod.yml
```

```bash
# Pod 목록 조회
kubectl get pod

# Pod 로그 확인
kubectl logs echo
kubectl logs -f echo

# Pod 컨테이너 접속
kubectl exec -it echo -- sh
# ls
# ps
# exit

# Pod 제거
kubectl delete -f echo-pod.yml
```

![image](https://user-images.githubusercontent.com/93081720/197324634-9dfcf079-5d47-4d39-b026-b6ef85727e3f.png)

### 컨테이너 상태 모니터링

`컨테이너 생성`과 실제 `서비스 준비`는 약간의 차이가 있음. 서버를 실행하더라도 바로 접속할 수 없고 초기화까지 대기 시간이 필요하고, 이후에 실제 접속이 가능할 때 `서비스가 준비되었다`고 말할 수 있음

![image](https://user-images.githubusercontent.com/93081720/197322138-15d36d81-c0a1-443f-87e4-dc541fe6fc2f.png)

#### livenessProbe

컨테이너가 정상적으로 동작하는지 체크하고 정상적으로 동작하지 않는다면 **컨테이너를 재시작**하여 문제를 해결

#### readinessProbe

컨테이너가 준비되었는지 체크하고 정상적으로 준비되지 않았다면 **Pod으로 들어오는 요청을 제외**합니다

#### livenessProbe + readinessProbe

보통은 `livenessProbe`와 `readinessProbe`를 같이 적용합니다.

```yml
apiVerison: v1
kind: Pod
metadata:
  name: echo
  labels:
    app: echo
spec:
  containers:
    - name: app
      image: ghcr.io/subicura/echo:v1
      livenessProbe:
        httpGet:
          path: /
          port: 3000
        initialDelaySeconds: 5
        timeoutSeconds: 2 # Default 1
        periodSeconds: 5 # Defaults 10
        failureThreshold: 1 # Defaults 3
      readinessProbe:
        httpGet:
          path: /
          port: 3000
        initialDelaySeconds: 5
        timeoutSeconds: 2 # Default 1
        periodSeconds: 5 # Defaults 10
        failureThreshold: 1 # Defaults 3
```



### 다중 컨테이너

대부분 `1Pod 1Container`이지만, 1Pod내에 여러 개의 컨테이너를 가진 경우도 있음

하나의 Pod에 속한 컨테이너들은 서로 localhost로 네트워크를 공유하고 동일한 디렉토리를 공유할 수 있음

```yml
# counter pod 생성
apiVersion: v1
kind: Pod
metadata:
  name: counter
  labels:
    app: counter
spec:
# 컨테이너가 app, db로 2개의 멀티 컨테이너로 이루어져있음
  containers:
    - name: app
      image: ghcr.io/subicura/counter:latest
      env:
        - name: REDIS_HOST
          value: "localhost"
    - name: db
      image: redis
```

![image](https://user-images.githubusercontent.com/93081720/197324612-d339e7df-170d-4bce-afc5-5e4e52ea2a5a.png)

<br>

## 2. ReplicaSet (레플리카 셋)

> Pod를 정해진 수만큼 복제/생성하고 관리하는 도구. pod를 유지하는 역할을 담당

레플리카 셋은 단독으로 쓰는 경우는 거의 없고, `Deployment`가 레플리카 셋을 이용하기 때문에 주로 `Deployment`를 사용함  

### 레플리카 셋 생성

![image](https://user-images.githubusercontent.com/93081720/197324978-3622eeb4-f7ac-46ba-9e87-928265c3e4e0.png)

```bash
# ReplicaSet 생성
kubectl apply -f echo-rs.yml

# 리소스 확인(pod, replicaset)
kubectl get po,rs
```

![image](https://user-images.githubusercontent.com/93081720/197324601-027d8487-f78a-418b-a565-fd85144d4e97.png)

> ReplicaSet은 `label을 체크`해서 `원하는 수`의 Pod이 없으면 `새로운 Pod`을 생성 => label이 겹치지 않게 신경써서 정의해야함

- `spec.selector`: label 체크 조건(매칭 라벨)
- `spec.replicas`: 원하는 pod의 개수
- `spec.template`: 생성할 pod의 명세



- label 확인

```bash
kubectl get pod --show-labels
```

![image](https://user-images.githubusercontent.com/93081720/197325209-d95d4c84-4f4c-4c3b-be8b-f8a90833a637.png)

- label 제거

```bash
# app- 를 지정하면 app label을 제거
kubectl label pod/echo-rs-9qsrf app-

# 다시 Pod 확인
kubectl get pod --show-labels
```

![image](https://user-images.githubusercontent.com/93081720/197325267-d202257a-6510-4d1d-a186-10adb333d0bc.png)

기존에 생성된 Pod의 `app` label이 사라지면서 `selector`에 정의한 `app=echo,tier=app` 조건을 만족하는 Pod의 개수가 0이 되어 새로운 Pod가 만들어짐

![image](https://user-images.githubusercontent.com/93081720/197325428-f8458536-4b3f-4d41-a822-0350e5c3d2ce.png)

- label 다시 추가하기

```bash
kubectl label pod/echo-rs-9qsrf app=echo
```

![image](https://user-images.githubusercontent.com/93081720/197325573-24e78513-2c26-41ee-98eb-492f29fe97a7.png)

pod 수가 2개에서 1개가 제거되어 1개로 줄어듬

### 레플리카 셋 동작 과정

![image](https://user-images.githubusercontent.com/93081720/197325640-1f6b4fc4-05b1-4e42-aed3-13a0371e0004.png)

1. `ReplicaSet Controller`는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
2. `ReplicaSet Controller`가 원하는 상태가 되도록 `Pod`을 생성하거나 제거
3. `Scheduler`는 API서버를 감시하면서 할당되지 않은unassigned `Pod`이 있는지 체크
4. `Scheduler`는 할당되지 않은 새로운 `Pod`을 감지하고 적절한 `노드`node에 배치
5. 이후 노드는 기존대로 동작



- 레플리카 셋 삭제
  - pod도 함께 제거된다

```bash
kubectl delete replicaset.apps/echo-rs
```



### 스케일 아웃

ReplicaSet을 이용하면 손쉽게 Pod을 여러개로 복제 가능

![image](https://user-images.githubusercontent.com/93081720/197325722-aca96824-2050-414c-8038-cce47697396c.png)

```bash
# 레플리카 셋 생성
kubectl apply -f echo-rs-scaled.yml

# Pod 확인
kubectl get pod,rs
```

![image](https://user-images.githubusercontent.com/93081720/197325871-66f223c3-d268-4637-8140-6337889b68ca.png)

<br>

## 3. Deployment (디플로이먼트)

> 쿠버네티스에서 가장 널리 사용되는 오브젝트로 ReplicaSet을 이용해 Pod를 업데이트하고 이력을 관리하거나 롤백(rollback) 또는 특정 버전으로 돌아갈 수 있음(revision) 

Deployment는 가장 흔하게 사용하는 배포방식. 이외에 StatefulSet, DaemonSet, CronJob, Job등이 있지만 사용법은 크게 다르지 않다.

### Deployment 만들기

- yml 파일 작성

```yml
# echo-deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
```

- 실행 및 결과 확인

```bash
# Deployment 생성
kubectl apply -f echo-deployment.yml

# 리소스 확인
kubectl get po,rs,deploy
```

![image](https://user-images.githubusercontent.com/93081720/197334477-1c33753b-7f2e-4e51-9c17-7cb1d1948c56.png)

- pod를 새로운 이미지로 업데이트

| before(v1)                                                   | after(v2)                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image](https://user-images.githubusercontent.com/93081720/197334545-7e98989e-6046-40f0-a182-c776ec2caec4.png) | ![image](https://user-images.githubusercontent.com/93081720/197334563-7688f5e5-436a-4d95-864f-9057bcafdcb1.png) |

```bash
# 새로운 이미지 업데이트
kubectl apply -f echo-deployment-v2.yml

# 리소스 확인
kubectl get po,rs,deploy
```

※ 아래 예시와 같이 kubectl명령어를 입력한다고 해서 엄청 빠른 속도로 모든 게 적용되는 것이 아님

- kubectl apply -f echo-deployment-v2.yml 입력 하자마자 바로 리소스 확인 시

![image](https://user-images.githubusercontent.com/93081720/197334632-a1bbe13f-fb88-4cf6-b11a-dde45a341e9a.png)

- 다시 한번 리소스 확인 명령어 입력 시

![image](https://user-images.githubusercontent.com/93081720/197334645-13b892ac-d347-4900-ab6e-5f8c9e252a56.png)

> 레플리카 셋이 replicaset.apps/echo-deploy-68b9dfd874에서 replicaset.apps/echo-deploy-58cfb87569으로 새롭게 교체되었고, Pod가 새로운 Pod들로 교체되었음

> Pod는 엄밀히 말해서 업데이트의 개념이 아니고, 새롭게 Pod를 생성하고, 기존 Pod를 제거하는 개념임

![image](https://user-images.githubusercontent.com/93081720/197334924-5af80af6-6d9f-441f-a58f-323c8e696b27.png)

![image](https://user-images.githubusercontent.com/93081720/197334963-1535c49d-666d-49fe-8f60-781f4be7f5c4.png)

### 스케일 조정

Deployment는 새로운 이미지로 업데이트하기 위해 ReplicaSet을 이용함. 버전을 업데이트하면 새로운 ReplicaSet을 생성하고 해당 ReplicaSet이 새로운 버전의 Pod을 생성

**[Deployment 만들기]**과정을 단계별로 그림으로 표현하면 아래와 같음(위에서 명령어 입력 시 바로 적용되지 않는다고 말한 부분이 아래 과정을 진행하는 도중과 작업이 완료되고 난 이후의 사진이었음)

- v1에 ReplicaSet 4개, v2에 ReplicaSet 0개(초기 상태)

![image](https://user-images.githubusercontent.com/93081720/197335160-b4463758-4fe3-4e06-a35a-84588156957c.png)

- v1에 ReplicaSet 4개 -> 3개로, v2에 ReplicaSet 0개 -> 1개로 조정

![image](https://user-images.githubusercontent.com/93081720/197335184-d770b69a-ba5f-4ed3-96c8-72c51ff409fd.png)

- v1에 ReplicaSet 3개 -> 2개로, v2에 ReplicaSet 1개 -> 2개로 조정

![image](https://user-images.githubusercontent.com/93081720/197335209-3dcf052b-a3bd-40ad-b5da-8debcc5beb83.png)

- v1에 ReplicaSet 2개 -> 1개로, v2에 ReplicaSet 2개 -> 3개로 조정

![image](https://user-images.githubusercontent.com/93081720/197335293-882bf349-89ee-4529-9c0c-683704825e63.png)

- v1에 ReplicaSet 1개 -> 0개로, v2에 ReplicaSet 3개 -> 4개로 조정

![image](https://user-images.githubusercontent.com/93081720/197335334-de6caba2-e597-4103-9b86-664432ac60c4.png)

```bash
# 생성된 Deployment 상세 상태 확인
kubectl describe deploy/echo-deploy
```

![image](https://user-images.githubusercontent.com/93081720/197335431-9ef195ee-10ae-45cb-846c-b9f71637f355.png)

Pod 수를 하나씩 생성하며 조정했음을 알 수 있다.(맨 위에 4개가 생성된 것은 v1에서 처음 4개가 생성한 것임)

#### 컨트롤러의 동작 과정

![image](https://user-images.githubusercontent.com/93081720/197335458-23c89f06-502f-435c-b9ce-99eb7a70f1e7.png)

1. `Deployment Controller`는 Deployment조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
2. `Deployment Controller`가 원하는 상태가 되도록 `ReplicaSet` 설정
3. `ReplicaSet Controller`는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른 것을 체크
4. `ReplicaSet Controller`가 원하는 상태가 되도록 `Pod`을 생성하거나 제거
5. `Scheduler`는 API서버를 감시하면서 할당되지 않은unassigned `Pod`이 있는지 체크
6. `Scheduler`는 할당되지 않은 새로운 `Pod`을 감지하고 적절한 `노드`node에 배치
7. 이후 노드는 기존대로 동작

**※ Deployment는 Deployment Controller가 관리하고 ReplicaSet과 Pod은 기존 Controller와 Scheduler가 관리함**

### 버전 관리

#### 히스토리 확인

```bash
# 히스토리 확인
kubectl rollout history deploy/echo-deploy

# revision 1 히스토리 상세 확인
kubectl rollout history deploy/echo-deploy --revision=1
```

#### 롤백

```bash
# 바로 전으로 롤백
kubectl rollout undo deploy/echo-deploy

# 특정 버전으로 롤백
kubectl rollout undo deploy/echo-deploy --to-revision=2
```

- (예시) 바로 전으로 롤백 시
  - 레플리카 셋이 v1으로 돌아왔음을 확인 가능

![image](https://user-images.githubusercontent.com/93081720/197335658-d0d4d235-93b4-4408-a7ad-030a0d8154d7.png)

### 배포 전략 설정

Rolling update 배포 전략으로 설정하는 예시

![image](https://user-images.githubusercontent.com/93081720/197335781-120e4603-db5d-4a89-8371-25f9a232787d.png)

- 생성 및 결과 확인

```bash
# 새로운 deployment 생성
kubectl apply -f echo-strategy.yml

# 결과 확인
kubectl get po,rs,deploy
```

- 명령어로 이미지 변경하여 배포 전략 적용 확인하기

```bash
# 이미지 변경 (명령어로)
kubectl set image deploy/echo-deploy-st echo=ghcr.io/subicura/echo:v2

# 이벤트 확인
kubectl describe deploy/echo-deploy-st
```

![image](https://user-images.githubusercontent.com/93081720/197336200-e0b77298-98e8-4d5b-8368-4aba2fbae9fb.png)

Pod을 하나씩 생성하지 않고 한번에 3개가 생성된 것을 확인할 수 있다

롤링 업데이트 배포 전략은 새 버전을 생성 후 일정 비율로 새 버전을 배포하고 구버전에서 점차 새 버전으로 완전 교체하는 배포 전략

> maxSurge와 maxUnavailable의 기본값은 25%. 대부분의 상황에서 적당하지만 상황에 따라 적절하게 조정필요

<br>

## 4. Service (서비스)

> Pod를 외부로 노출시키므로써 클러스터 외부에서  Pod로 접근할 수 있게 해주는 도구. 로드밸런서의 역할

Pod은 자체 IP를 가지고 다른 Pod과 통신할 수 있지만, 쉽게 사라지고 생성되는 특징 때문에 직접 통신하는 방법은 권장하지 않는다.

쿠버네티스는 Pod과 직접 통신하는 방법 대신, **별도의 고정된 IP를 가진 서비스를 만들고 그 서비스를 통해 Pod에 접근하는 방식을 사용**한다. => Service

![image](https://user-images.githubusercontent.com/93081720/197337018-f6999f67-1045-4386-8109-ad477e2508a8.png)

서비스는 노출 범위에 따라 `CluterIP`, `NodePort`, `LoadBalancer` 타입으로 나누어진다.

### Service (ClusterIP) 만들기

CluterIP는 클러스터 내부에서만 접근 가능

- yml 파일 생성

※ 하나의 YAML파일에 여러 개의 리소스를 정의할 땐 "---"를 구분자로 사용

```yml
# counter-redis-svc.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  selector:
    matchLabels:
      app: counter
      tier: db
  template:
    metadata:
      labels:
        app: counter
        tier: db
    spec:
      containers:
        - name: redis
          image: redis
          ports:
            - containerPort: 6379
              protocol: TCP
---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  ports:
    - port: 6379
      protocol: TCP
  selector:
    app: counter
    tier: db
```

```bash
kubectl apply -f counter-redis-svc.yml

# Pod, ReplicaSet, Deployment, Service 상태 확인
kubectl get all
```

![image](https://user-images.githubusercontent.com/93081720/197338076-80f29993-3a0c-42b3-9a8c-043a230ea73d.png)

![image](https://user-images.githubusercontent.com/93081720/197338885-99261334-d2f3-4d60-af55-361e9099c64d.png)

#### CluterIP 서비스 설정

- `spec.ports.port`: 서비스가 생성할 Port번호
- `spec.ports.targetPort`: 서비스가 접근할 Pod의 Port (기본: port랑 동일)
- `spec.selector`: 서비스가 접근할 Pod의 label 조건



- redis에 접근할 counter 앱 생성(Deployment)

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: counter
spec:
  selector:
    matchLabels:
      app: counter
      tier: app
  template:
    metadata:
      labels:
        app: counter
        tier: app
    spec:
      containers:
        - name: counter
          image: ghcr.io/subicura/counter:latest
          env:
            - name: REDIS_HOST
              value: "redis"
            - name: REDIS_PORT
              value: "6379"
```

- 접근 테스트

```bash
kubectl apply -f counter-app.yml

# counter app에 접근
kubectl get po # counter-XXXXXX-xxxxx # counter-985748f4c-7knvz

# 접근
kubectl exec -it counter-985748f4c-7knvz -- sh

curl localhost:3000
curl localhost:3000
telnet redis 6379
dbsize
KEYS *
GET count
quit

exit
```

### Service 생성 흐름

Service는 각 Pod를 바라보는 로드밸런서 역할을 하면서 내부 도메인 서버에 새로운 도메인을 생성한다.

![image](https://user-images.githubusercontent.com/93081720/197338584-9683f66a-a611-4644-9287-b5a54ae3ef52.png)

1. `Endpoint Controller`는 `Service`와 `Pod`을 감시하면서 조건에 맞는 Pod의 IP를 수집
2. `Endpoint Controller`가 수집한 IP를 가지고 `Endpoint` 생성
3. `Kube-Proxy`는 `Endpoint` 변화를 감시하고 노드의 iptables을 설정
4. `CoreDNS`는 `Service`를 감시하고 서비스 이름과 IP를 `CoreDNS`에 추가

- `iptables`는 커널(kernel) 레벨의 네트워크 도구
- `CoreDNS`는 빠르고 편리하게 사용할 수 있는 클러스터 내부용 도메인 네임 서버

=> `iptables` 설정으로 여러 IP에 트래픽을 전달하고 `CoreDNS`를 이용하여 IP 대신 도메인 이름을 사용하는 구조

#### Endpoint

Endpoint는 서비스의 접속 정보를 가지고 있음

```bash
kubectl get endpoints
kubectl get ep #줄여서

# redis Endpoint 확인
kubectl describe ep/redis
```



### Service (NodePort) 만들기

- yml 파일 생성
  - `spec.ports.nodePort`: 노드에 오픈할 port (미지정시 30000-32768 중에 자동 할당)
  - counter app을 해당 노드의 31000으로 오픈

```yml
# counter-nodeport.yml
apiVersion: v1
kind: Service
metadata:
  name: counter-np
spec:
  type: NodePort
  ports:
    - port: 3000
      protocol: TCP
      nodePort: 31000
  selector:
    app: counter
    tier: app
```

![image](https://user-images.githubusercontent.com/93081720/197338966-1226a396-ca8c-421b-ba7a-77ebc0fa8d49.png)

- 실행 및 확인

```bash
kubectl apply -f counter-nodeport.yml

# 서비스 상태 확인
kubectl get svc
```

![image](https://user-images.githubusercontent.com/93081720/197339080-387f8891-2e1c-478b-a822-f35bc68247f8.png)

- 접속하기

`minikube ip 명령어를 통해 나온 클러스터 노드 IP:31000`로 접속

![image](https://user-images.githubusercontent.com/93081720/197339938-1169d73c-84b5-4b21-8c6d-d5278304849a.png)

※ Docker driver를 사용 중일 경우 `minikube service counter-np` 명령어를 이용

NodePort는 클러스터의 모든 노드에 포트를 오픈한다. 여러 개의 노드가 있더라도 아무 노드로 접근해도 지정한 Pod로 접근할 수 있다.

> NodePort는 기본적으로 ClusterIP의 기능을 포함한다

![image](https://user-images.githubusercontent.com/93081720/197339165-cd1a5793-b3a1-47ca-af23-22ff5ffc9a4c.png)

![image](https://user-images.githubusercontent.com/93081720/197339177-e580a20d-fc7c-4d85-b0f2-de120b6adaa4.png)

#### 단점

NodePort의 단점은 노드가 사라졌을 때, 자동으로 다른 노드를 통해 접근이 불가능하다. 예를 들어, 3개의 노드가 있다고 가정했을 때 3개 중에 아무 노드로 접근해도 NodePort로 연결할 수 있지만, 어떤 노드가 살아 있는지는 알 수 없다



### Service (LoadBalancer) 만들기

자동으로 살아 있는 노드에 접근하기 위해서는 모든 노드를 바라보고 있는 `로드 밸런서(Load Balancer)`가 필요하다.

브라우저는 NodePort에 직접 요청을 보내는 것이 아니라, Load Balancer에 요청을 하고 Load Balancer가 알아서 살아 있는 노드로 접근한다.

- yml 파일 생성

```yml
# counter-lb.yml
apiVersion: v1
kind: Service
metadata:
  name: counter-lb
spec:
  type: LoadBalancer
  ports:
    - port: 30000
      targetPort: 3000
      protocol: TCP
  selector:
    app: counter
    tier: app
```

```bash
# 실행하기
kubectl apply -f counter-lb.yml

# 서비스 상태 확인
kubectl get svc
```

![image](https://user-images.githubusercontent.com/93081720/197339470-059ef2f9-3843-466a-a1d5-1c6fa3d4d8b6.png)

생성되었지만, `EXTERNAL-IP`가 `<pending>`상태임. 로드 밸런서는 AWS, GC, Azure 같은 클라우드 환경이 아니면 사용이 제한적임. 왜냐하면 특정 서버(노드)를 가리키는 무언가(로드 밸런서)가 필요한데, 가상 머신이나 로컬에서는 이런 무언가가 존재하지 않기 때문

#### minikube에 가상 LoadBalancer 만들기

- `metallb`: Load Balancer를 사용할 수 없는 환경에서 가상 환경을 만들어 줌

```bash
minikube addons enable metallb
```

![image](https://user-images.githubusercontent.com/93081720/197339618-e8f1c418-90b6-411e-b62d-0033aa6319d9.png)

minikube ip로 확인한 ip를 ConfigMap으로 지정해줘야한다.

```bash
minikube addons configure metallb
```

![image](https://user-images.githubusercontent.com/93081720/197339720-5666b1fc-ff25-41c4-ac0e-d767ef9c46da.png)

minikube를 사용하지 않고 yml파일로 직접 ConfigMap을 작성할 수도 있다.

- yml 파일로 ConfigMap 작성하기

```yml
# metallb-cm.yml
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - # minikube ip
```

- 실행 및 확인

```bash
# 실행
kubectl apply -f metallb-cm.yml

# 서비스 확인
kubectl get svc
```

두 방법 중 하나를 적용하고 다시 서비스 상태를 확인하면 아래와 같이 나온다.

![image](https://user-images.githubusercontent.com/93081720/197339841-79abedb3-0bb9-4d71-b6b3-da7fceaa60b9.png)

`EXTERNAL-IP:30000`으로 접속하기

![image](https://user-images.githubusercontent.com/93081720/197340042-29981188-a274-4cb2-b9e0-1443016151d8.png)

※ Docker driver를 사용 중일 경우 `minikube service counter-lb` 명령어를 이용

> LoadBalancer는 기본적으로 NodePort의 기능을 포함한다.