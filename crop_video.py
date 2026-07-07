import os
import sys

try:
    from moviepy.editor import VideoFileClip
    import moviepy.video.fx.all as vfx
except ImportError:
    print("Instalando moviepy...")
    os.system("pip install moviepy==1.0.3")
    from moviepy.editor import VideoFileClip
    import moviepy.video.fx.all as vfx

def crop_to_mobile(input_path, output_path):
    print(f"Lendo vídeo: {input_path}")
    clip = VideoFileClip(input_path)
    
    w, h = clip.size
    print(f"Tamanho original: {w}x{h}")
    
    # Razão 9:16
    target_ratio = 9.0 / 16.0
    current_ratio = w / h
    
    if current_ratio > target_ratio:
        # Vídeo é mais largo que 9:16, precisamos cortar as laterais (crop horizontal)
        new_w = int(h * target_ratio)
        new_h = h
    else:
        # Vídeo é mais alto que 9:16 (improvável, mas vamos cobrir), corta em cima/baixo
        new_w = w
        new_h = int(w / target_ratio)
        
    x_center = w / 2
    y_center = h / 2
    
    print(f"Cortando para: {new_w}x{new_h}")
    
    # Cortar o centro
    cropped_clip = vfx.crop(clip, width=new_w, height=new_h, x_center=x_center, y_center=y_center)
    
    print(f"Renderizando vídeo mobile... Isso pode levar alguns minutos dependendo da CPU.")
    # bitrate otimizado para mobile para não ficar gigante
    cropped_clip.write_videofile(
        output_path, 
        codec="libx264", 
        audio_codec="aac", 
        bitrate="2000k",
        threads=4,
        preset="ultrafast"
    )
    
    print(f"Sucesso! Vídeo salvo em {output_path}")

if __name__ == "__main__":
    input_file = "assets/videos/hero_video.mp4"
    output_file = "assets/videos/hero_video_mobile.mp4"
    
    if not os.path.exists(input_file):
        print(f"Erro: Arquivo {input_file} não encontrado.")
        sys.exit(1)
        
    crop_to_mobile(input_file, output_file)
