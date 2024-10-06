import pygame
from board import boards
import math

pygame.init()

# game variables
WIDTH = 900
HEIGHT = 950
screen = pygame.display.set_mode((WIDTH, HEIGHT))
fps = 60
timer = pygame.time.Clock()
font = pygame.font.Font('freesansbold.ttf', 20)
run = True

# level variables
level = boards
tile_height = ((HEIGHT - 50) // 32)
tile_width = (WIDTH // 30)

# player variables
player_images = []
direction = 0
counter = 0
flicker = False

for i in range(4):
    player_images.append(pygame.transform.
                         scale(pygame.image.load(f'assets/player_images/{i + 1}.png'), (45, 45)))

player_x = 450
player_y = 663

def draw_board(lvl):
    for i in range(len(lvl)):
        for j in range(len(lvl[i])):
            if lvl[i][j] == 1:
                pygame.draw.circle(screen, 'white', (j * tile_width + (0.5 * tile_width), i * tile_height + (0.5 * tile_height)), 4)
            if lvl[i][j] == 2 and not flicker:
                pygame.draw.circle(screen, 'white', (j * tile_width + (0.5 * tile_width), i * tile_height + (0.5 * tile_height)), 10)
            if lvl[i][j] == 3:
                pygame.draw.line(screen, 'blue', (j * tile_width + (0.5 * tile_width), i * tile_height),
                                                   (j * tile_width + (0.5 * tile_width), i * tile_height + tile_height), 3)
            if lvl[i][j] == 4:
                pygame.draw.line(screen, 'blue', (j * tile_width, i * tile_height + (0.5 * tile_height)),
                                                   (j * tile_width + tile_width, i * tile_height + (0.5 * tile_height)), 3)
            if lvl[i][j] == 5:
                pygame.draw.arc(screen, 'blue', (j * tile_width - tile_width * 0.5, i * tile_height + 0.5 * tile_height, 
                                                 tile_width, tile_height), 0, math.pi / 2, 3)
            if lvl[i][j] == 6:
                pygame.draw.arc(screen, 'blue', (j * tile_width + 0.5 * tile_width, i * tile_height + 0.5 * tile_height, 
                                                 tile_width, tile_height), math.pi / 2, math.pi, 3)
            if lvl[i][j] == 7:
                pygame.draw.arc(screen, 'blue', (j * tile_width + 0.5 * tile_width, i * tile_height - 0.4 * tile_height, 
                                                 tile_width, tile_height), math.pi, 3 * math.pi / 2, 3)
            if lvl[i][j] == 8:
                pygame.draw.arc(screen, 'blue', (j * tile_width - tile_width * 0.4 - 2, i * tile_height - 0.44 * tile_height, 
                                                 tile_width, tile_height), 3 * math.pi / 2, 2 * math.pi, 3)
            if lvl[i][j] == 9:
                pygame.draw.line(screen, 'white', (j * tile_width, i * tile_height + (0.5 * tile_height)),
                                                   (j * tile_width + tile_width, i * tile_height + (0.5 * tile_height)), 3)
            
def draw_player():
    if direction == 0:
        screen.blit(player_images[counter // 5], (player_x, player_y))
    if direction == 1:
        screen.blit(pygame.transform.flip(player_images[counter // 5], True, False), (player_x, player_y))
    if direction == 2:
        screen.blit(pygame.transform.rotate(player_images[counter // 5], 90), (player_x, player_y))
    if direction == 3:
        screen.blit(pygame.transform.rotate(player_images[counter // 5], 270), (player_x, player_y))
        
def check_position(center_x, center_y):
    turns = [False, False, False, False]
    num3 = 15

    if center_x // 30 < 29:
        pass
if __name__ == '__main__':
    while run:
        timer.tick(fps)

        if counter < 19:
            counter += 1
            if counter > 3:
                flicker = False
        else:
            counter = 0
            flicker = True
        screen.fill('black')

        draw_board(level)
        draw_player()

        center_x = player_x + 23
        center_y = player_y + 24


        turns_allowed = check_position(center_x, center_y)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                    direction = 1
                
                if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                    direction = 0
                
                if event.key == pygame.K_UP or event.key == pygame.K_w:
                    direction = 2
                
                if event.key == pygame.K_DOWN or event.key == pygame.K_s:
                    direction = 3

        pygame.display.flip()

        

    pygame.quit() 
