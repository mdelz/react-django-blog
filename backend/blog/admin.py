from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import (
    Post, Category, Tag, 
    Section,
)

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'state', 'visibility', 'publish_date')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'publish_date')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass

@admin.register(Section)
class SectionAdmin(MarkdownxModelAdmin):
    list_display = ('post', 'order', 'type')