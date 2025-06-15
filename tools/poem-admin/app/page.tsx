'use client'

import { useState, useEffect, useMemo } from 'react'
import { convertToEnglishId } from '@/lib/name-mapping'
import './globals.css'

interface Poem {
  id: string
  idolName: string
  clothesTitle: string
  clothesName: string
  text: string
}

interface PoemData {
  updatedAt: string
  poems: Poem[]
}

export default function PoemAdmin() {
  const [data, setData] = useState<PoemData | null>(null)
  const [filteredPoems, setFilteredPoems] = useState<Poem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null)
  const [formData, setFormData] = useState<Partial<Poem>>({})
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // 入力補完用のデータ
  const suggestions = useMemo(() => {
    if (!data) return { ids: [], idols: [], clothesTitles: [], clothesNames: [], poemTexts: [] }
    
    const ids = [...new Set(data.poems.map(p => p.id))].sort()
    const idols = [...new Set(data.poems.map(p => p.idolName))].sort()
    const clothesTitles = [...new Set(data.poems.map(p => p.clothesTitle))].sort()
    const clothesNames = [...new Set(data.poems.map(p => p.clothesName))].sort()
    const poemTexts = [...new Set(data.poems.map(p => p.text))].sort()
    
    return { ids, idols, clothesTitles, clothesNames, poemTexts }
  }, [data])

  useEffect(() => {
    loadPoems()
  }, [])

  useEffect(() => {
    if (data) {
      const query = searchQuery.toLowerCase()
      const filtered = data.poems.filter(poem => 
        poem.idolName.toLowerCase().includes(query) ||
        poem.clothesTitle.toLowerCase().includes(query) ||
        poem.clothesName.toLowerCase().includes(query) ||
        poem.text.toLowerCase().includes(query)
      )
      setFilteredPoems(filtered)
    }
  }, [data, searchQuery])

  const loadPoems = async () => {
    try {
      const response = await fetch('/api/poems')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to load poems:', error)
    }
  }

  const openModal = (poem?: Poem) => {
    setEditingPoem(poem || null)
    setFormData(poem || {
      idolName: '',
      clothesTitle: '',
      clothesName: '',
      text: ''
    })
    setErrors([])
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingPoem(null)
    setFormData({})
    setErrors([])
  }

  const handleSubmit = async () => {
    setLoading(true)
    setErrors([])

    try {
      const action = editingPoem ? 'update' : 'create'
      
      // 新規追加時にIDが空なら自動生成
      let poemData = { ...formData }
      if (action === 'create' && !poemData.id && poemData.clothesName && poemData.idolName) {
        poemData.id = convertToEnglishId(poemData.clothesName, poemData.idolName)
      }
      
      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, poem: poemData })
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors(result.errors || ['エラーが発生しました'])
        return
      }

      await loadPoems()
      closeModal()
    } catch (error) {
      setErrors(['保存中にエラーが発生しました'])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (poem: Poem) => {
    if (!confirm(`「${poem.clothesTitle}」を削除しますか？`)) return

    try {
      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', poem })
      })

      if (response.ok) {
        await loadPoems()
      }
    } catch (error) {
      console.error('Failed to delete poem:', error)
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>シャニポエム管理画面</h1>
        {data && (
          <div className="stats">
            <span>総ポエム数: {data.poems.length}件</span>
            <span>最終更新: {data.updatedAt}</span>
          </div>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="アイドル名、衣装名、ポエムで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="button" onClick={() => openModal()}>
          新規追加
        </button>
      </div>

      <div className="poem-list">
        {filteredPoems.map((poem) => (
          <div
            key={poem.id}
            className="poem-item"
            onClick={() => openModal(poem)}
          >
            <div className="poem-idol">{poem.idolName}</div>
            <div className="poem-clothes">{poem.clothesTitle} / {poem.clothesName}</div>
            <div className="poem-text">{poem.text}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingPoem ? 'ポエム編集' : '新規ポエム追加'}</h2>
            
            {errors.length > 0 && (
              <div className="error">
                {errors.map((error, i) => (
                  <div key={i}>{error}</div>
                ))}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">アイドル名</label>
              <input
                type="text"
                className="form-input"
                list="idol-suggestions"
                value={formData.idolName || ''}
                onChange={(e) => setFormData({ ...formData, idolName: e.target.value })}
              />
              <datalist id="idol-suggestions">
                {suggestions.idols.map(idol => (
                  <option key={idol} value={idol} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">衣装名</label>
              <input
                type="text"
                className="form-input"
                list="clothes-name-suggestions"
                value={formData.clothesName || ''}
                onChange={(e) => setFormData({ ...formData, clothesName: e.target.value })}
              />
              <datalist id="clothes-name-suggestions">
                {suggestions.clothesNames.map(name => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">衣装タイトル</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  list="clothes-title-suggestions"
                  value={formData.clothesTitle || ''}
                  onChange={(e) => setFormData({ ...formData, clothesTitle: e.target.value })}
                />
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => {
                    if (formData.clothesName) {
                      setFormData({ ...formData, clothesTitle: formData.clothesName })
                    }
                  }}
                  style={{ flexShrink: 0 }}
                >
                  衣装名をコピー
                </button>
              </div>
              <datalist id="clothes-title-suggestions">
                {suggestions.clothesTitles.map(title => (
                  <option key={title} value={title} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">ポエムテキスト</label>
              <input
                type="text"
                className="form-input"
                list="poem-text-suggestions"
                value={formData.text || ''}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                maxLength={100}
              />
              <datalist id="poem-text-suggestions">
                {suggestions.poemTexts.map((text, index) => (
                  <option key={index} value={text} />
                ))}
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">ID</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  list="id-suggestions"
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="例: CelestialColors_SakuragiMano"
                />
                <datalist id="id-suggestions">
                  {suggestions.ids.map(id => (
                    <option key={id} value={id} />
                  ))}
                </datalist>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={async () => {
                    if (formData.clothesName && formData.idolName) {
                      setLoading(true)
                      try {
                        const response = await fetch('/api/generate-id', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            clothesName: formData.clothesName,
                            idolName: formData.idolName,
                            existingIds: suggestions.ids
                          })
                        })
                        const result = await response.json()
                        if (result.id) {
                          setFormData({ ...formData, id: result.id })
                        }
                      } catch (error) {
                        console.error('ID生成エラー:', error)
                        // フォールバック
                        const generatedId = convertToEnglishId(formData.clothesName, formData.idolName)
                        setFormData({ ...formData, id: generatedId })
                      } finally {
                        setLoading(false)
                      }
                    }
                  }}
                  style={{ flexShrink: 0 }}
                  disabled={loading}
                >
                  スマート自動生成
                </button>
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                ※ シャニマスのアイドル名・衣装名を自動的に英語IDに変換します
              </div>
            </div>

            <div className="form-actions">
              {editingPoem && (
                <button
                  className="button button-secondary"
                  onClick={() => handleDelete(editingPoem)}
                  disabled={loading}
                  style={{ marginRight: 'auto' }}
                >
                  削除
                </button>
              )}
              <button
                className="button button-secondary"
                onClick={closeModal}
                disabled={loading}
              >
                キャンセル
              </button>
              <button
                className="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}