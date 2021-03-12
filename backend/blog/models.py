from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from markdownx.models import MarkdownxField

# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ["name"]

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
        """ On save, update timestamps """
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(Page, self).save(*args, **kwargs)

    class Meta:
        ordering = ["-publish_date"]


class Category(Page):
    pass


class Post(Page):
    class Status(models.IntegerChoices):
        DRAFT = 1
        PUBLISHED = 2
        DELETED = 3

    class Visibility(models.IntegerChoices):
        PUBLIC = 1
        INTERNAL = 2
        PRIVATE = 3

    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    state = models.IntegerField(choices=Status.choices, default=Status.DRAFT)
    visibility = models.IntegerField(
        choices=Visibility.choices, default=Visibility.PUBLIC
    )
    preview = models.TextField(max_length=512, default="Preview")
    thumbnail = models.ImageField(upload_to="posts/thumbnails", blank=True)
    banner = models.ImageField(upload_to="posts/banner", blank=True)
    post_category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag)

    class Meta:
        permissions = [
            ("can_read_all_post", "Can read private posts"),
            ("can_read_restricted_post", "Can read internal posts"),
            ("can_create_post", "Can create posts as draft"),
            ("can_delete-post", "Can delete posts in status draft"),
            ("can_publish_post", "Can un/publish posts"),
        ]


class Section(models.Model):
    class SectionType(models.IntegerChoices):
        TEXT = 1
        IMAGE = 2
        VIDEO = 3
        TEXT_IMAGE = 4
        TEXT_VIDEO = 5

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="sections")
    order = models.SmallIntegerField()
    type = models.IntegerField(choices=SectionType.choices, default=SectionType.TEXT)
    image = models.ImageField(upload_to="posts", null=True)
    video = models.CharField(max_length=255, null=True)
    media_left = models.BooleanField(default=True)
    media_alt = models.CharField(max_length=255, null=True)
    media_caption = models.TextField(max_length=512, null=True)
    text = MarkdownxField(max_length=4096 * 4, blank=True)

    def __str__(self):
        return f"#{self.order}"

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["post", "order"], name="post_sections")
        ]
        ordering = ["order"]
