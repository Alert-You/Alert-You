# Minikube

k8s 학습을 도와주는 간단한 도구

설치를 위해서는 2CPU와 2GB의 메모리, 20GB의 디스크스페이스가 필요

## 1. kubectl 설치

minikube를 설치하기 전에 로컬에 `kubectl`(큐베컨트롤)을 설치한다

### Chocolatey 이용

- 윈도우 파워쉘을 관리자 권한으로 실행하여 다음 커맨드를 입력([설치주소](https://chocolatey.org/install))

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

- CMD를 관리자 권한으로 실행하여 kubectl설치

```bash
choco install kubernetes-cli
```

![image](https://user-images.githubusercontent.com/93081720/196986570-5fba8bd1-af1c-4de3-bd35-9c89972a7d7f.png)

- 버전 확인

```
kubectl version --client
```

- 홈 디렉토리 이동

```
cd %USERPROFILE% 또는 cd ~
```

- `.kube` 디렉토리 생성 및 이동

```
mkdir .kube
cd .kube
```

![image](https://user-images.githubusercontent.com/93081720/196988022-27b63787-a761-456c-8f27-49cfa706b409.png)

- config 파일 생성

텍스트 파일이어도 상관없지만 확장자가 없는 파일로 만든다

```bash
touch config
```

![image](https://user-images.githubusercontent.com/93081720/196988504-e5700cce-c9e0-4d5f-8661-3b4838c6d846.png)

<br>

## 2. Minikube 설치

[설치 주소](https://minikube.sigs.k8s.io/docs/start/)

![image](https://user-images.githubusercontent.com/93081720/196989150-5c4acaa5-5066-4379-807a-841065bb7edf.png)

### 1. Hyper-V 활성화

Docker Desktop을 설치하면서 Hyper-V를 활성화했다면 이번 단계는 건너뛰어도 좋다.

- 파워쉘을 관리자 권한으로 실행

```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

- CMD에서 Hyper-V활성화하기(선택)

파워쉘에서 진행했다면 할 필요 없음

```
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V
```

참고) Hyper-V on/off

```
# 끄기
bcdedit /set hypervisorlaunchtype off

# 켜기
bcdedit /set hypervisorlaunchtype auto
```

### 2. Minikube 설치

![image](https://user-images.githubusercontent.com/93081720/196991170-b855b477-58e3-455f-82bb-4b3d002e7944.png)

설치를 진행한다

- CMD에서 버전 확인

```
minikube version
```

![image](https://user-images.githubusercontent.com/93081720/196991456-2b284765-dfd5-453f-9ad3-c541aff002a5.png)

### 3. 실행하기

- CMD 실행하기(꼭 관리자 권한으로 실행하지 않아도 되지만, 혹시 에러가 난다면 관리자 권한 실행)

```
minikube start --driver=hyperv
```

![image-20221021003109956](C:\Users\SIWON\AppData\Roaming\Typora\typora-user-images\image-20221021003109956.png)

※ 만약 에러가 발생한다면? docker 또는 virtualbox 설치 후 다음과 같이 입력하여 진행

- virtualbox나 hyper-v 둘 중 하나만 사용해야하므로 hyper-v를 비활성화하거나, virtualbox를 이용하지 않아야함(Windows 10 Home의 경우 Hyper-V를 사용하지 못하는 경우도 있어 virtualbox를 사용)

```
minikube start --driver=docker
minikube start --driver=virtualbox
```

### 4. 작동 확인

- 터미널에서 host, kubelet, apiserver의 상태 등을 확인

```
minikube status
```

![image](https://user-images.githubusercontent.com/93081720/196994536-9374dad4-b745-4d54-ae53-036bb2f55a6c.png)

- dashboard를 확인할 수도 있음

대시보드를 종료하려면 Ctrl + C를 두 번 누르면 된다.

```
minikube dashboard
```

![image](https://user-images.githubusercontent.com/93081720/196995031-8a6682ab-6af9-4386-8fe8-ea2f129742ba.png)

![image](https://user-images.githubusercontent.com/93081720/196995236-224f2ff5-80f0-4045-8097-4069c2b2a88f.png)
