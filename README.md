
### Geliştirme ortamının hazırlanması

1. Kişisel GitHub hesabında react-native-task isimli private bir repo oluştur.
2. GitHub hesabındaki react-native-task reposunu açtığında en alttaki Import code düğmesini göreceksin.
Bu özelliği kullanarak https://github.com/tarfin-labs/react-native-task adresindeki repoyu import et.
3. Private repo'nu inceleyebilmemiz için, şu GitHub kullanıcılarını Settings->Collaborators->Manage access->Add People ile davet et:
`frkcn`, `hozdemir`, `emreyeter`, `hsndmr`
4. Api servisini ve uygulamayı çalıştır.
6. Yaptığın değişikliklerin [atomik](https://en.wikipedia.org/wiki/Atomic_commit) olmasına dikkat et.
7. En fazla 15dk'da bir `commit`'le.

## Api Servisi

```bash
$ cd api
$ npm install 
$ npm run start:prod
```
Bu uygulama, yapılacak mobil uygulama için api servisi sağlamaktadır. Ana dizinde yer alan `postman.json` dosyasında tüm örnek istek kullanımları mevcuttur.
| Endpoint                          | Method | Description                                                                                |
|-----------------------------------|--------|--------------------------------------------------------------------------------------------|
| http://127.0.0.1:3000/products    | GET    | Ürünleri listeler. Token gereklidir.                                                       |
| http://127.0.0.1:3000/auth/login  | POST   | 11 haneli kimlik numarası ile giriş işlemini başlatır.                                     |
| http://127.0.0.1:3000/user/verify | POST   | Login işleminden sonra doğrulama kodu girilerek doğrulama işlemi yapılır. Token gereklidir |
| http://127.0.0.1:3000/user        | GET    | Kullanıcın bilgisini getirir. Token gereklidir.                                            |
| http://127.0.0.1:3000/auth/logout | POST   | Giriş yapmış kullanıcıların çıkış yapmasını sağlar. Token gereklidir.                      |      

## Mobil Uygulama

```bash
$ cd task
$ yarn install
$ yarn ios 
```

### Yapılacak Mobil Uygulamanın Akışı

`Not:` Api uygulamasını çalıştırdıktan sonra, uygulama dizini içerisinde yer alan 'postman.json' dosyasını kullanarak, `Postman` uygulamasıyla uygulama servisinin örnek istek kullanımlarına erişebilirsiniz. Api' de aşağıda kullanacağınız bütün istekler yer almaktadır.

1-) `Home` ve `Profile` ekranları Tab navigation (https://reactnavigation.org/docs/tab-based-navigation) kullanarak yapılması gerekmektedir. Uygulama ilk açıldığında, `Home` ekranı açılmalıdır.

2-) `Home` ekranında, eğer kullanıcı giriş yaptıysa ürünler listenmeli, eğer giriş yapmadıysa `Ürünleri görebilmek için giriş yapmanız gerekmektedir` bilgisi yer almalıdır. Ürünler enpoint'inde, 30 tane ürün bulunmaktadır. Her istekte 10 tane ürün gelmektedir. Ürünler listelenirken sayfalama yapılması gerekmektedir (infinite scroll).

3-) `Profile` ekranında, eğer kullanıcı giriş yapmadıysa, `Login` ekranı gözükmelidir. Eğer giriş yaptıysa, profil bilgilerinin yer aldığı `Profile` ekranı gözükmelidir.  Kullanıcı `Login` ekranı ile giriş yapabilir. 11 haneli bir numara girerek kullanıcı giriş işlemini başlatabilir.  11 haneli numarasını girdikten sonra, doğrulama kodunu (123456) girerek giriş işlemini tamamlayabilir. 123456 değerinden başka bir değer girerse istek başarısız olacaktır.

4-) `Profile` ekranında, giriş yapmış kullanıcının adı, soyadı, doğum tarihi, 11 haneli numarası, telefonu ve cinsiyeti gözükmelidir. Ayrıca `Profile` ekranında, `Çıkış Yap` butonu olmalı ve giriş yapmış kullanıcılar çıkış yapabilmelidir.

### Ekranlar

1-) Home Ekranı
  * Eğer kullanıcı giriş yapmadıysa  `Ürünleri görebilmek için giriş yapmanız gerekmektedir` bilgisi yer almalı. 
  * Eğer kullanıcı giriş yaptıysa, ürünler listenmeli (infinite scroll).
  * `/products` endpoint'i kullanılmalıdır.

2-) Login Ekranı
  * Kullanıcı 11 haneli kimlik numarasını girerek, giriş yapabilir.
  * 11 haneli kimlik numarasını girdikte sonra, doğrulama kodu bölümü gözükmeli ve giriş işlemini tamamlayabilmek için doğrulama kodunu girmelidir. Doğrulama kodu değeri 123456 olup bunun dışında girilen tüm değerlerde giriş işlemi tamamlanmaz. 123456 dışında bir doğrulama kodu girerse hata mesajı gözükmelidir. Doğrulama kodunu 123456 girdiğinde Profile ekranı gözükmelidir.
  * `auth/login` endpoint'i kullanılmalıdır.
  * `auth/verify` endpoint'i kullanılmalıdır (11 haneli kimlik numarasını yazdıktan sonra doğrulama kodu için gerekli). 

  `Not:` Kullanıcı 11 haneli kimlik numarasını girdikten sonra, kullanıcıya bir `token` iletilir. Kullanıcı bu `token` değerini kullanarak doğrulama kodunu girer. Doğrulama kodunu girdikten sonra, ürünlere erişebilir. `12345678901` kimlik numarası ile giriş yapabilir, bunun dışındaki tüm değerler için 404 durumu dönecektir.

3-) Profile Ekranı
 * Adı, soyadı, doğum tarihi, 11 haneli kimlik numarası, telefonu ve cinsiyeti yer almalıdır.
 * Çıkış yap özelliği eklenmedir (`auth/logout` endpoint'i kullanılmalıdır).

 ### NOTLAR
  * Kullanıcı giriş yaptıktan sonra, uygulamayı kapatıp tekrar açtığında, yeniden giriş yapmaması gerekir.
  * Redux kullanılabilir.
  * En az 2 component için test kodu yazılmalıdır.
