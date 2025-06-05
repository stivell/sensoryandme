export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          role: 'admin' | 'parent'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          phone?: string | null
          role?: 'admin' | 'parent'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          role?: 'admin' | 'parent'
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          class_id: string
          user_id: string
          child_name: string
          child_age: number
          special_needs: string | null
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          class_id: string
          user_id: string
          child_name: string
          child_age: number
          special_needs?: string | null
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          class_id?: string
          user_id?: string
          child_name?: string
          child_age?: number
          special_needs?: string | null
          payment_status?: string
          created_at?: string
        }
      }
      classes: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time: string
          duration: number
          capacity: number
          enrolled: number
          price: number
          location_id: string
          age_group: string
          skills: string[]
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time: string
          duration: number
          capacity: number
          enrolled?: number
          price: number
          location_id: string
          age_group: string
          skills: string[]
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time?: string
          duration?: number
          capacity?: number
          enrolled?: number
          price?: number
          location_id?: string
          age_group?: string
          skills?: string[]
          image_url?: string | null
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip?: string
          image_url?: string | null
          created_at?: string
        }
      }
    }
  }
}