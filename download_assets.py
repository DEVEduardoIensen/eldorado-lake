import os
import urllib.request

# URLs mapped to cleaner, descriptive local filenames
assets_to_download = {
    "hero_bg.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUB71C5U7ky4VVhebc0zJxNDFk3NWK0kkxLOD6rSPlKclN1Xc3UZFUPvudid0EbnkkuVgE_2h4iNgZF_22KEjRSD4qatmZTvwY5kq3G_DlSqUkqoSEMELHlKnKWQhKsCrouUWlqcFJUGIcJV80JgRF1pFNTlGLz8n7P4-BBt7ZAEELXDg4hDqqyQoY3wlOI=w16383",
    "logo.png": "https://lh3.googleusercontent.com/sitesv/AA5AbUBzG1pcn6zrgFNTl9L1bsAu9El3zhnGx_qfyKWO6z6LkIvYuTCRL5irMOhL30idvImmNmUfljMCFONWz9D-7SGJ5m6pk_DZULKA_EwKpZub26joA2p_74Ge864bRY3dPRMA7ysbmsy-FMBcu6Mm6bjQH3zc2GvCh_Q3fKPrRDArgWRC6UDfokcb0gBZi5yxd9z9uvszFDdZLNpfuECys9fNJKA9hZ8K3b6McLoupUQ=w1280",
    "dourado_banner.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUBLa4a2sESu50LH7HxnrgLc8ZYyi0Qipeom-0tUrz_oYo_F3_IM-V3IIGLyfck_o57Ql2CXUMYSsERVAFv_OaZ4JdVrxdEVAwKjOQIl14g6sryuND5gePFtwhSgrfNaC9Ry9scdVLgMwOZWAWRKxcNDs1Epy8aMyrKeb0NPau_cv6xdy0R3t0ETLE0GTbo=w16383",
    "rancho_1.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUBvzdhb2i3i7GVfOTMNKukiPlvoRV0j6ZXyanpxKBZG8_NNr8SBcREvvVtyE5XQRPLFBTzuRmzTTG00XIUqR0X5gEOu4-3FsTXSOAobV-1EpgY6H3ui1xzghdJn3Z9rBr1pv7WGyanqlu13HpJOygFc68e3FUnz2MaWQ9ldAyis9TNRDmyWN_qap2kbPKo=w16383",
    "rancho_2.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUAklZL5HI1hIzg5tlSeXDqminTDcly2fa-nclm-aaiLx8tCDPb4uTErhpdeNgniBUKinWkxqwWvDEn7I6XzZtny42g6-2CUqYAA276vYv_nnX8DW9xQBsoXOVnXj0cn90_0OG_cmlx3a9H8uiZCwJurG0HFoQ4SJQDW7z0y49XcBjeGphp2Fdtoo10c=w1280",
    "pacote_banner_1.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUBHZTSKCgwJEO00WQhpc73rk6ANIPEuq9yL37j9vpfMb4KXgdlV2Fu-pp6xW7IaN74Rv22fQ75vzILUkptEqx2pjnPTskJz9Q41NAdw0lhMU6iwIqgwVEvlhUjorW03bY0EzT3dFTiQ1X1ElM84REhPNK82CRWyLyHgDFbsMavuLWozIszpPjmf-B5fhK4=w16383",
    "pacote_banner_2.jpg": "https://lh3.googleusercontent.com/sitesv/AA5AbUAwLWZ72QB1QkSZGpihZi1W4XG4gndoDaBGTNaH0EZNqHZXA5pv9HPkkJMmmBA0JcWo2z7x7dRtZCyrsuM5zUuruW4IlfM1oFvwW-aLUD7pNGYpwS7CoeravDrrtxtJvwPXFiKIMpwqfu6g_try3Ykgwe3JFDePP_qNDOuI0u6l8_Kksiirq53xBYjp=w1280"
}

output_dir = os.path.join("assets", "images")
os.makedirs(output_dir, exist_ok=True)

print("Iniciando download dos assets da Eldorado Lake...")

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

for filename, url in assets_to_download.items():
    dest_path = os.path.join(output_dir, filename)
    print(f"Baixando {filename}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(dest_path, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Salvo em: {dest_path}")
    except Exception as e:
        print(f"Erro ao baixar {filename}: {e}")

print("Concluído!")
