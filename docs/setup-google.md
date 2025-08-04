
# 🔐 Google Sign-In với Supabase Auth trong Expo (React Native)

Tài liệu hướng dẫn thiết lập đăng nhập Google **native** trên Android bằng **Expo + Supabase**, không dùng WebView.

---

## ✅ Yêu cầu

- Supabase project đã tạo
- Google Cloud project đã tạo
- `eas` CLI và Expo project đã cài
- Không chạy trong Expo Go (phải build `.apk` hoặc dùng `eas run`)

---

## ⚙️ Các bước thiết lập

### 1. Cài đặt thư viện

```bash
npx expo install expo-dev-client expo-build-properties
npm install @react-native-google-signin/google-signin @supabase/supabase-js
````

---

### 2. Tạo OAuth Client ID trong Google Console

Vào [Google Console](https://console.cloud.google.com/apis/credentials)

#### ➤ Tạo **Android Client ID**:

* App type: `Android`
* Package name: `com.hoagxxll.expoquiz` (theo `app.json`)
* SHA-1 fingerprint: lấy từ `eas credentials`

#### ➤ Tạo **Web Client ID**:

* App type: `Web application`
* Không cần redirect URI
* Sau khi tạo → copy `client_id` để dùng ở các bước sau

---

### 3. Cấu hình Supabase

Vào Supabase Dashboard:

* `Authentication → Providers → Google`
* Dán **Web Client ID** vào ô **Client ID**

---

### 4. Cập nhật `app.json`

```jsonc
{
  "expo": {
    "android": {
      "package": "com.hoagxxll.expoquiz",
      "permissions": [
        "INTERNET",
        "GET_ACCOUNTS"
      ]
    },
    "plugins": [
      "@react-native-google-signin/google-signin",
      "expo-build-properties"
    ]
  }
}
```

---

### 5. Cấu hình Google Sign-In trong code

#### `supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://<your-project>.supabase.co',
  '<public-anon-key>'
)
```

#### `LoginScreen.tsx`

```tsx
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { supabase } from '../utils/supabase'
import { useEffect } from 'react'

export default function LoginScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID_HERE',
      offlineAccess: false,
      scopes: ['profile', 'email'],
    })
  }, [])

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const idToken = userInfo.idToken
      if (!idToken) throw new Error('Missing ID Token')

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      })

      if (error) console.error(error)
      else console.log('✅ Supabase login success', data)
    } catch (error) {
      console.log('❌ Google Sign-In error', error)
    }
  }

  return (
    <GoogleSigninButton
      onPress={handleLogin}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
    />
  )
}
```

---

### 6. Build app để test

```bash
eas run -p android
# hoặc
eas build -p android
```

❌ Không chạy bằng Expo Go — sẽ không hoạt động!

---

## 🧪 Debug lỗi thường gặp

| Lỗi                            | Nguyên nhân                                 | Cách xử lý                                     |
| ------------------------------ | ------------------------------------------- | ---------------------------------------------- |
| `code: 10` / `DEVELOPER_ERROR` | Sai `webClientId`, SHA-1, hoặc dùng Expo Go | Kiểm tra lại đúng loại client & build app thật |
| `no ID token present!`         | Google chưa trả token                       | Kiểm tra lại cấu hình `GoogleSignin.configure` |
| Không thấy nút Google          | Quên import `GoogleSigninButton`            | Kiểm tra lại import + render đúng vị trí       |

---

## 🧠 Ghi nhớ

* App cần Web Client ID để lấy ID Token từ Google
* Supabase cần Web Client ID để xác thực người dùng
* Android Client ID chỉ để Google kiểm tra app hợp lệ

---

## 📎 Tài liệu liên quan

* [react-native-google-signin](https://github.com/react-native-google-signin/google-signin)
* [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
