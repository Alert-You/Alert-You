# 00_kubectl

## 1. kubectl 명령어

| 명령어     | 설명                                                         |
| ---------- | ------------------------------------------------------------ |
| `apply`    | 원하는 상태를 적용합니다. 보통 `-f` 옵션으로 파일과 함께 사용 |
| `get`      | 리소스 목록 출력                                             |
| `describe` | 리소스의 상태를 자세히 출력                                  |
| `delete`   | 리소스를 제거                                                |
| `logs`     | 컨테이너의 로그를 출력                                       |
| `exec`     | 컨테이너에 명령어를 전달. 컨테이너에 접근할 때 주로 사용     |
| `config`   | kubectl 설정을 관리                                          |

※ alias 설정하기

```bash
# alias 설정
alias k='kubectl'

# shell 설정
echo "alias k='kubectl'" >> ~/.bashrc
source ~/.bashrc
```

### 1. 상태 설정하기 (apply)

```bash
kubectl apply -f [파일명 또는 URL]
```

### 2. 리소스 목록 보기 (get)

```bash
kubectl get [TYPE]
```

- 예시

```bash
# Pod 조회
kubectl get pod

# 줄임말(Shortname)과 복수형 사용가능
kubectl get pods
kubectl get po

# 여러 TYPE 입력
kubectl get pod,service
kubectl get po,svc

# k8s 오브젝트(Pod, ReplicaSet, Deployment, Service, Job) 조회 => all
kubectl get all

# 결과 포멧 변경
kubectl get pod -o wide
kubectl get pod -o yaml
kubectl get pod -o json

# Label 조회
kubectl get pod --show-labels
```

### 3. 리소스 상세 상태 보기 (describe)

```bash
kubectl describe [TYPE]/[NAME] 또는 [TYPE] [NAME]
```

- 예시

```bash
# Pod 조회로 이름 검색
kubectl get pod # wordpress-c9569c4d8-ngk2b

# 조회한 이름으로 상세 확인
kubectl describe pod/wordpress-c9569c4d8-ngk2b
```

### 4. 리소스 제거 (delete)

```
kubectl delete [TYPE]/[NAME] 또는 [TYPE] [NAME]
```

- 예시

```
# Pod 조회로 이름 검색
kubectl get pod # wordpress-c9569c4d8-ngk2b

# 조회한 이름으로 상세 확인
kubectl delete pod/wordpress-c9569c4d8-ngk2b
```

> Pod는 제거해도 다시 계속해서 살아난다 => 정상!! ReplicaSet이 Pod의 개수를 유지시켜줌

### 5. 컨테이너 로그 조회 (logs)

```
kubectl logs [POD_NAME]
```

- 예시

```shell
# Pod 조회로 이름 검색
kubectl get pod

# 조회한 Pod 로그조회
kubectl logs wordpress-c9569c4d8-ngk2b

# 실시간 로그 보기 (ctrl + C 2번하여 종료)
kubectl logs -f wordpress-c9569c4d8-ngk2b
```

### 6. 컨테이너 명령어 전달 (exec)

컨테이너 상태를 확인하는 경우에 `-it` 옵션을 사용하고 여러 개의 컨테이너가 있는 경우엔 `-c` 옵션으로 컨테이너를 지정 가능

```
kubectl exec [-it] [POD_NAME] -- [COMMAND]
```

- 예시

```bash
# Pod 조회로 이름 검색
kubectl get pod

# 조회한 Pod의 컨테이너에 접속(exit 명령어로 종료)
kubectl exec -it wordpress-c9569c4d8-ngk2b -- bash
```

![image](https://user-images.githubusercontent.com/93081720/197320111-2c6e02ef-3f10-4763-8c7a-4c363fb33c14.png)

### 7. 설정 관리(config)

```bash
# 현재 컨텍스트 확인
kubectl config current-context

# 컨텍스트 설정
kubectl config use-context minikube
```

### 기타

```bash
# 전체 오브젝트 종류 확인
kubectl api-resources
```

```bash
# 특정 오브젝트 설명 보기
kubectl explain pod
```

- 예시 - pod에 대한 설명

![image](https://user-images.githubusercontent.com/93081720/197320197-16217fce-a7b5-4ce8-babe-e3495fa618b7.png)