from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from markdownx.models import MarkdownxField

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Page(models.Model):
    title = models.CharField(max_length=120)
    keywords = models.CharField(max_length=120, blank=True)
    slug = models.SlugField(max_length=255, unique=True)
    updated = models.DateTimeField(editable=False, default=None, null=True)
    created = models.DateTimeField(editable=False, default=None, null=True)
    publish_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(Page, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-publish_date']

class Category(Page):
    pass

class Post(Page):
    class Status(models.IntegerChoices):
        DRAFT = 1
        PUBLISHED = 2
        DELTED = 3
    class Visibility(models.IntegerChoices):
        PUBLIC = 1
        INTERNAL = 2
        PRIVATE = 3
    state = models.IntegerField(choices=Status.choices, default=Status.DRAFT)
    visibility = models.IntegerField(choices=Visibility.choices, default=Visibility.PUBLIC)
    preview = models.TextField(max_length=512, default='Preview')
    thumbnail = models.ImageField(upload_to='posts/thumbnails', blank=True)
    banner = models.ImageField(upload_to='posts/banner', blank=True)
    post_category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)

class Section(models.Model):
    class SectionType(models.IntegerChoices):
        TEXT = 1
        IMAGE = 2
        IMAGE_LEFT = 3
        IMAGE_RIGHT = 4
        VIDEO = 5
        VIDEO_LEFT = 6
        VIDEO_RIGHT = 7
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='sections')
    order = models.SmallIntegerField()
    type = models.IntegerField(choices=SectionType.choices, default=SectionType.TEXT)
    image = models.ImageField(upload_to='posts', blank=True)
    video = models.CharField(max_length=255,  blank=True)
    text = MarkdownxField(max_length=4096*4, blank=True)

    def __str__(self):
        return f'#{self.order}'

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post', 'order'], name='post_sections')
        ]
        ordering = ['order']